import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  RiDeleteBin6Line,
  RiAddLine,
  RiSubtractLine,
  RiShoppingBag3Line,
  RiShieldCheckLine,
} from "react-icons/ri";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/cart/get/${loggedInUser._id}`,
        );

        const data = await res.json();

        setCartItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQty = async (productId, delta) => {
    const item = cartItems.find((i) => i._id === productId);

    const newQty = item.qty + delta;

    if (newQty < 1 || newQty > item.stock) return;

    const updated = cartItems.map((i) =>
      i._id === productId ? { ...i, qty: newQty } : i,
    );

    setCartItems(updated);

    await fetch("http://localhost:4000/cart/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: loggedInUser._id,
        productId,
        qty: newQty,
      }),
    });
  };
  const removeItem = async (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
    await fetch("http://localhost:4000/cart/remove", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: loggedInUser._id,
        productId,
      }),
    });
  };
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cartItems],
  );
  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 10;
  const total = subtotal + deliveryFee;
  const hasOutOfStock = cartItems.some((item) => item.stock === 0);
  if (isLoading)
    return (
      <div className="h-screen bg-[#0b1120] flex items-center justify-center text-emerald-500 font-black animate-pulse">
        SYNCING BAG...
      </div>
    );
  if (cartItems.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0b1120] text-white">
        <RiShoppingBag3Line size={80} className="text-slate-800 mb-6" />

        <h2 className="text-3xl font-black mb-2">
          Bag is <span className="text-emerald-500">Empty</span>
        </h2>
        <Link
          to="/products"
          className="bg-emerald-500 text-slate-900 px-10 py-4 rounded-2xl font-black"
        >
          Explore Store
        </Link>
      </div>
    );
  }
  return (
    <div className="h-screen bg-[#0b1120] text-white p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-4 max-h-[520px] overflow-y-auto custom-scroll">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                layout
                className="bg-[#111a2e] p-4 rounded-xl flex items-center gap-4"
              >
                <img
                  src={`http://localhost:4000/images${item.image}`}
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />

                <div className="flex-grow">
                  <p className="text-emerald-500 text-xs font-bold">
                    {item.brand}
                  </p>

                  <h3 className="font-bold">{item.name}</h3>

                  <p>${item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQty(item._id, -1)}>
                    <RiSubtractLine />
                  </button>
                  <span>{item.qty}</span>
                  <button
                    disabled={item.qty >= item.stock}
                    onClick={() => updateQty(item._id, 1)}
                  >
                    <RiAddLine />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500"
                >
                  <RiDeleteBin6Line />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ORDER SUMMARY */}
        <aside className="bg-[#111a2e] p-6 rounded-xl">
          <h3 className="font-black mb-6 flex items-center gap-2">
            <RiShieldCheckLine className="text-emerald-500" />
            Order Summary
          </h3>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-between mb-6">
            <span>Shipping</span>
            <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee}`}</span>
          </div>

          <div className="text-3xl font-black mb-6">${total}</div>

          <button
            disabled={hasOutOfStock}
            onClick={() => navigate("/payment")}
            className="w-full bg-emerald-500 text-slate-900 py-3 rounded-xl font-black"
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
