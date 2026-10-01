import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Sparkles,
  Truck,
  RotateCcw,
  CreditCard,
  Building
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, totalItems, clearCart } = useCart();

  // Customer Form Details
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('Sathyamangalam');
  const [state, setState] = useState('Tamil Nadu');
  const [pincode, setPincode] = useState('638401');

  // Payment Status State
  // 'idle' | 'creating_order' | 'awaiting_payment' | 'verifying' | 'success' | 'failed'
  const [paymentStatus, setPaymentStatus] = useState<
    'idle' | 'creating_order' | 'awaiting_payment' | 'verifying' | 'success' | 'failed'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    paymentId: string;
    amount: number;
    customer: {
      name: string;
      mobile: string;
      email: string;
      address: string;
    };
    items: Array<{
      name: string;
      size: string;
      quantity: number;
      price: number;
      image: string;
    }>;
  } | null>(null);

  // Fallback loader if script tag hadn't finished loading
  const ensureRazorpayLoaded = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim() || !mobileNumber.trim() || !emailAddress.trim() || !streetAddress.trim()) {
      setErrorMessage('Please fill in all required customer and delivery address fields.');
      return;
    }

    if (cart.length === 0) {
      setErrorMessage('Your shopping bag is empty. Please add items before checkout.');
      return;
    }

    setPaymentStatus('creating_order');

    try {
      const isLoaded = await ensureRazorpayLoaded();
      if (!isLoaded || !window.Razorpay) {
        throw new Error('Razorpay Checkout SDK could not be loaded. Please check your internet connection and retry.');
      }

      // 1. Create Order on Server
      const createOrderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: subtotal,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            customer_name: fullName.trim(),
            customer_email: emailAddress.trim(),
            customer_phone: mobileNumber.trim(),
            city,
            pincode
          }
        })
      });

      const orderData = await createOrderRes.json();

      if (!createOrderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment order on server.');
      }

      const { orderId, amount, currency, keyId } = orderData;
      setPaymentStatus('awaiting_payment');

      // Captured items before clearing cart
      const currentCartItems = cart.map(item => ({
        name: item.product.name,
        size: item.selectedSize,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images[0]
      }));

      // 2. Open Razorpay Standard Checkout in TEST MODE
      const options = {
        key: keyId,
        amount: amount,
        currency: currency || 'INR',
        name: 'ROOP VASTRA',
        description: 'Tradition Woven with Elegance • Sathyamangalam',
        image: '/images/women/Sarees/saree1.jpg',
        order_id: orderId,
        prefill: {
          name: fullName.trim(),
          email: emailAddress.trim(),
          contact: mobileNumber.trim()
        },
        notes: {
          delivery_address: `${streetAddress.trim()}, ${city}, ${state} - ${pincode}`
        },
        theme: {
          color: '#6A1B29' // Boutique Maroon
        },
        modal: {
          ondismiss: () => {
            setPaymentStatus('failed');
            setErrorMessage('Payment window was closed before completion. You can retry safely whenever you are ready.');
          }
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          setPaymentStatus('verifying');

          try {
            // 3. Server-side Cryptographic HMAC-SHA256 Signature Verification
            const verifyRes = await fetch('/api/payment/verify-signature', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerDetails: {
                  name: fullName.trim(),
                  mobile: mobileNumber.trim(),
                  email: emailAddress.trim(),
                  address: `${streetAddress.trim()}, ${city}, ${state} - ${pincode}`
                },
                items: currentCartItems,
                totalAmount: subtotal
              })
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success || !verifyData.verified) {
              throw new Error(verifyData.error || 'Server signature verification failed. Illegitimate or tampered payment response.');
            }

            // Confirmed Payment Success!
            setConfirmedOrder({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              amount: subtotal,
              customer: {
                name: fullName.trim(),
                mobile: mobileNumber.trim(),
                email: emailAddress.trim(),
                address: `${streetAddress.trim()}, ${city}, ${state} - ${pincode}`
              },
              items: currentCartItems
            });

            setPaymentStatus('success');
            clearCart();
          } catch (verifyErr: any) {
            console.error('[CHECKOUT VERIFICATION ERROR]', verifyErr);
            setPaymentStatus('failed');
            setErrorMessage(verifyErr.message || 'Payment signature verification failed. Please contact boutique support.');
          }
        }
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', (resp: any) => {
        console.warn('[RAZORPAY PAYMENT FAILED]', resp.error);
        setPaymentStatus('failed');
        setErrorMessage(
          resp.error?.description || 'Payment was declined by the bank/gateway. You can retry with another test method.'
        );
      });

      rzpInstance.open();
    } catch (err: any) {
      console.error('[PAYMENT FLOW ERROR]', err);
      setPaymentStatus('failed');
      setErrorMessage(err.message || 'Could not launch payment gateway. Please retry.');
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (paymentStatus === 'success' && confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-gold-400 shadow-xl overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#540D22] via-[#6A1B29] to-[#3D0A19] text-[#FAF6EE] p-8 text-center relative">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9 text-emerald-300" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-300 block mb-1">
                Verified &amp; Confirmed • Test Mode
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold">
                Order Placed Successfully!
              </h1>
              <p className="text-xs sm:text-sm text-cream-200/80 mt-2 max-w-md mx-auto">
                Vanakkam, {confirmedOrder.customer.name}! Your payment has been securely verified server-side via Razorpay.
              </p>
            </div>

            {/* Verification Metadata Box */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-cream-100/60 rounded-2xl border border-gold-300/80 text-xs">
                <div>
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Razorpay Order ID</span>
                  <span className="font-mono font-bold text-maroon-950 break-all">{confirmedOrder.orderId}</span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Razorpay Payment ID</span>
                  <span className="font-mono font-bold text-emerald-800 break-all">{confirmedOrder.paymentId}</span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Amount Paid</span>
                  <span className="font-bold text-maroon-900 text-sm">₹{confirmedOrder.amount.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Payment Verification</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5" /> HMAC-SHA256 Cryptographically Verified
                  </span>
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="p-4 bg-white rounded-xl border border-gold-200 text-xs">
                <h4 className="font-serif font-bold text-darkbrown-900 text-sm mb-1 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-600" />
                  Insured Pan-India Express Delivery
                </h4>
                <p className="text-gray-600">{confirmedOrder.customer.name} • {confirmedOrder.customer.mobile} • {confirmedOrder.customer.email}</p>
                <p className="text-gray-800 font-medium mt-1">{confirmedOrder.customer.address}</p>
              </div>

              {/* Items Summary */}
              <div>
                <h4 className="font-serif font-semibold text-darkbrown-900 text-sm mb-3">
                  Purchased Masterpieces ({confirmedOrder.items.length})
                </h4>
                <div className="divide-y divide-gold-200/60 border border-gold-200 rounded-xl overflow-hidden">
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-white flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-14 object-cover object-top rounded border border-gold-200" />
                        <div>
                          <p className="font-serif text-xs font-bold text-darkbrown-900 line-clamp-1">{item.name}</p>
                          <p className="text-[11px] text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-maroon-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/"
                  className="flex-1 py-3 px-4 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow text-center transition"
                >
                  Return to Boutique Home
                </Link>
                <Link
                  to="/accessories"
                  className="py-3 px-6 bg-white hover:bg-cream-100 text-maroon-900 border border-gold-400 text-xs font-semibold uppercase tracking-wider rounded-xl text-center transition"
                >
                  Browse Accessories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART VIEW
  if (cart.length === 0 && paymentStatus !== 'success') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-16 px-4">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-3xl border border-gold-300 shadow-luxury">
          <div className="w-16 h-16 rounded-full bg-cream-100 border border-gold-300 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-gold-600" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-darkbrown-900 mb-2">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs text-gray-600 mb-6 leading-relaxed">
            Please add your favorite South Indian silk sarees, kurtis, or temple accessories to proceed with checkout.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow transition"
          >
            Explore Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-maroon-800 transition">Home</Link>
          <span>/</span>
          <span className="text-maroon-900 font-semibold">Boutique Checkout</span>
        </div>

        {/* Top Banner with Test Mode indicator */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900">
                  Razorpay Test Mode
                </span>
                <span className="text-xs font-medium text-amber-900">
                  Safe Sandbox Simulation
                </span>
              </div>
              <p className="text-[11px] text-amber-800/80 mt-0.5">
                No real bank account or card will be charged. All payments are securely simulated using Razorpay test cards, UPI, or NetBanking.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-950 font-bold px-3 py-1 bg-white/80 rounded-full border border-amber-300">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-rose-950">Payment Action Notice</p>
              <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Customer & Shipping Details Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gold-300 shadow-luxury p-6 sm:p-8">
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-gold-200">
                <Building className="w-5 h-5 text-maroon-800" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-darkbrown-900">
                  Delivery &amp; Customer Information
                </h2>
              </div>

              <form onSubmit={handleStartPayment} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sudeekshaa Ramesh"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                  />
                </div>

                {/* Mobile Number & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Mobile Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9345527013"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sudeekshaav2004@gmail.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                    Shipping Street Address <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House / Apartment no., Street name, Landmark..."
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                  />
                </div>

                {/* City, State, Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Town / City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    />
                  </div>
                </div>

                {/* Submit / Pay CTA Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={paymentStatus === 'creating_order' || paymentStatus === 'awaiting_payment' || paymentStatus === 'verifying'}
                    className="w-full py-4 px-6 bg-maroon-800 hover:bg-maroon-900 disabled:bg-maroon-800/70 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl shadow-lg shadow-maroon-950/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {paymentStatus === 'creating_order' && (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-gold-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating Razorpay Order...</span>
                      </span>
                    )}
                    {paymentStatus === 'awaiting_payment' && (
                      <span className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gold-300 animate-pulse" />
                        <span>Razorpay Checkout Active...</span>
                      </span>
                    )}
                    {paymentStatus === 'verifying' && (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-gold-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Verifying HMAC Signature Server-Side...</span>
                      </span>
                    )}
                    {(paymentStatus === 'idle' || paymentStatus === 'failed') && (
                      <>
                        <Lock className="w-4 h-4 text-gold-300" />
                        <span>Pay ₹{subtotal.toLocaleString('en-IN')} via Razorpay (Test Mode)</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-gray-500 mt-2">
                    Accepts Cards, UPI, NetBanking, and Wallets in Razorpay Test sandbox.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-gold-300 shadow-luxury p-6 sm:p-8 space-y-6 sticky top-6">
              <div className="flex items-center justify-between pb-4 border-b border-gold-200">
                <h3 className="font-serif text-lg font-bold text-darkbrown-900">
                  Order Summary
                </h3>
                <span className="text-xs bg-gold-100 text-gold-800 font-bold px-2 py-0.5 rounded-full">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gold-200/60 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="py-3.5 first:pt-0 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-16 object-cover object-top rounded-md border border-gold-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-serif text-xs font-semibold text-darkbrown-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Size: <span className="font-medium text-darkbrown-800">{item.selectedSize}</span>
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Qty: <span className="font-medium text-darkbrown-800">{item.quantity}</span>
                        </p>
                      </div>
                    </div>

                    <span className="font-bold text-xs text-maroon-900 whitespace-nowrap">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 pt-4 border-t border-gold-200 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-darkbrown-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    Sathyamangalam Gift Packaging
                  </span>
                  <span className="text-emerald-700 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-gold-600" />
                    Express Pan-India Shipping
                  </span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="border-t border-gold-200 pt-3 flex justify-between text-base font-bold text-darkbrown-900">
                  <span>Total Payable</span>
                  <span className="text-lg text-maroon-800 font-serif">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-gold-100 grid grid-cols-3 gap-2 text-center text-[10px] text-gray-500">
                <div className="p-2 bg-cream-50 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-gold-600 mx-auto mb-1" />
                  <span>100% Genuine Silk</span>
                </div>
                <div className="p-2 bg-cream-50 rounded-lg">
                  <Truck className="w-4 h-4 text-gold-600 mx-auto mb-1" />
                  <span>Tamper-proof Box</span>
                </div>
                <div className="p-2 bg-cream-50 rounded-lg">
                  <RotateCcw className="w-4 h-4 text-gold-600 mx-auto mb-1" />
                  <span>Easy Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
