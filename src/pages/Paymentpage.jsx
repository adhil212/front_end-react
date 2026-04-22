import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiTruckLine,
  RiWallet3Line,
  RiInformationLine,
  RiQrCodeLine,
} from "react-icons/ri";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    upiId: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const loadCheckoutData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`https://backend-sk0h.onrender.com/cart/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setCartItems(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to sync with server");
      } finally {
        setIsLoading(false);
      }
    };

    loadCheckoutData();
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cartItems],
  );

  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 10;

  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const finalizeOrder = async () => {
    if (cartItems.length === 0) {
      return toast.error("ACCESS DENIED: No items found in payload.");
    }

    if (!formData.firstName || !formData.phone) {
      return toast.error("Incomplete Logistics: Fill in required details");
    }

    try {
      if (paymentMethod === "COD") {
        toast.loading("Authorizing Transaction...");
        console.log("Calling backend...");

        const token = localStorage.getItem("token");

        const response = await fetch("https://backend-sk0h.onrender.com/order/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            address: formData,
            paymentMethod: "COD",
          }),
        });

        if (!response.ok) throw new Error();

        toast.dismiss();
        toast.success("Transaction Encrypted & Confirmed!");

        navigate("/orders");
        return;
      }

      toast.loading("Connecting to Payment Gateway...");

      const res = await fetch("https://backend-sk0h.onrender.com/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      toast.dismiss();

      const options = {
        key: "rzp_test_SVsyt6P0MG74K5",
        amount: order.amount,
        currency: "INR",
        name: "EzBuy",
        description: "Secure Payment",
        order_id: order.id,

handler: async function (response) {

  const token = localStorage.getItem("token");

  const verifyRes = await fetch("https://backend-sk0h.onrender.com/payment/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      address: formData,
      paymentMethod: "Online",
    }),
  });

  if (!verifyRes.ok) throw new Error();

  toast.success("Payment Verified!");

  navigate("/orders");
},

        theme: {
          color: "#10b981",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.dismiss();
      toast.error("System Override: Transaction Failed");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-[#0b1120] flex items-center justify-center text-emerald-500 font-black italic">
        ENCRYPTING...
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0b1120] text-white flex flex-col p-6 lg:p-10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <header className="mb-6 shrink-0">
          <h2 className="text-3xl font-black italic">
            Secure <span className="text-emerald-500">Checkout</span>
          </h2>
        </header>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0 pb-4">
          <div className="lg:col-span-2 overflow-y-auto pr-4 custom-scrollbar">
            <h3 className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest mb-6">
              <RiTruckLine /> Delivery Logistics
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleInputChange}
                className="bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
              />

              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleInputChange}
                className="bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
              />

              <input
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                className="col-span-2 bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
              />

              <input
                name="street"
                placeholder="Street Address"
                onChange={handleInputChange}
                className="col-span-2 bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
              />

              <input
                name="city"
                placeholder="City"
                onChange={handleInputChange}
                className="bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
              />

              <input
                name="zip"
                placeholder="Zip Code"
                onChange={handleInputChange}
                className="bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleInputChange}
                className="col-span-2 bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <aside className="flex flex-col gap-6 min-h-0">
            <div className="bg-[#111a2e] p-6 rounded-[2rem] border border-white/5 shadow-xl shrink-0">
              <h3 className="flex items-center gap-2 text-white font-black text-xs uppercase mb-4">
                <RiInformationLine className="text-emerald-500" /> Summary
              </h3>

              <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-2">
                <span>SUBTOTAL</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-4">
                <span>SHIPPING</span>
                <span>${deliveryFee}</span>
              </div>

              <div className="flex justify-between items-end border-t border-white/5 pt-4">
                <span className="text-[10px] font-black uppercase text-gray-500">
                  Total
                </span>

                <span className="text-3xl font-black text-emerald-500">
                  ${total}
                </span>
              </div>
            </div>

            <div className="bg-[#111a2e] p-6 rounded-[2rem] border border-white/5 shadow-xl flex-grow overflow-y-auto custom-scrollbar">
              <h3 className="flex items-center gap-2 text-white font-black text-xs uppercase mb-4">
                <RiWallet3Line className="text-emerald-500" /> Payment
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("COD")}
                  className={`w-full p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                    paymentMethod === "COD"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                      : "border-white/5 bg-slate-900/40 text-gray-500"
                  }`}
                >
                  Cash on Delivery
                </button>

                <button
                  onClick={() => setPaymentMethod("Online")}
                  className={`w-full p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                    paymentMethod === "Online"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                      : "border-white/5 bg-slate-900/40 text-gray-500"
                  }`}
                >
                  UPI / Online Pay
                </button>
              </div>

              {paymentMethod === "Online" && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="relative">
                    <RiQrCodeLine className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />

                    <input
                      name="upiId"
                      placeholder="Enter UPI ID (e.g. user@okaxis)"
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-emerald-500/30 p-4 pl-12 rounded-xl text-xs outline-none focus:border-emerald-500 transition-all placeholder:text-gray-700"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={finalizeOrder}
              disabled={cartItems.length === 0}
              className={`w-full shrink-0 font-black h-16 rounded-2xl transition-all shadow-lg uppercase tracking-[0.2em] text-xs ${
                cartItems.length === 0
                  ? "bg-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                  : "bg-emerald-500 text-slate-900 hover:bg-white active:scale-95 shadow-emerald-500/20"
              }`}
            >
              {cartItems.length === 0 ? "Payload Empty" : "Confirm Transaction"}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
