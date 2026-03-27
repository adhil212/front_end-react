import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RiShoppingBagLine,
  RiCloseCircleLine,
  RiCalendarLine,
  RiHashtag,
  RiMapPinUserLine,
} from "react-icons/ri";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:4000/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser?._id) {
      fetchOrders();
    }
  }, [loggedInUser?._id]);

  const cancelOrder = async (orderId) => {
    try {
      toast.loading("Updating system...");

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/orders/cancel", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      const updatedOrders = orders.filter((o) => o.orderId !== orderId);

      setOrders(updatedOrders);

      toast.dismiss();
      toast.success("Order cancelled");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to cancel order");
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#0b1120] flex items-center justify-center text-emerald-500 font-black tracking-[0.4em] uppercase animate-pulse italic">
        Syncing History...
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0b1120] text-white flex flex-col p-6 lg:p-12 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
        <header className="mb-10 shrink-0">
          <h1 className="text-4xl lg:text-5xl font-black italic">
            Order <span className="text-emerald-500">History</span>
          </h1>
          <p className="text-gray-500 mt-2 font-bold uppercase text-[9px] tracking-[0.4em]">
            Tracking established acquisition protocols
          </p>
        </header>

        <div className="flex-grow overflow-y-auto pr-4 custom-scroll min-h-0 pb-10">
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem]"
            >
              <RiShoppingBagLine size={60} className="text-slate-800 mb-6" />

              <h2 className="text-xl font-bold text-gray-600 uppercase tracking-widest">
                No History Detected
              </h2>

              <Link
                to="/products"
                className="text-emerald-500 font-black mt-4 uppercase text-xs hover:tracking-widest transition-all"
              >
                Start ordering
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-8 ">
              <AnimatePresence mode="popLayout">
                {orders.map((order) => (
                  <motion.div
                    key={order.orderId}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#111a2e]/60 border border-white/5 rounded-[2.5rem] p-6 lg:p-10 group hover:border-emerald-500/30 transition-all shadow-2xl relative overflow-hidden"
                  >
                    <span className="absolute -right-4 -top-2 text-[80px] font-black text-white/[0.02] pointer-events-none select-none italic">
                      {order.orderId?.split("-")[1]?.slice(-4)}
                    </span>

                    <div className="flex flex-wrap justify-between items-start gap-4 mb-10 relative z-10">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">
                          <RiHashtag /> {order.orderId}
                        </div>

                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                          <RiCalendarLine className="text-emerald-500" />{" "}
                          {order.date}
                        </div>

                        {order.address && (
                          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            <RiMapPinUserLine className="text-emerald-500" />
                            {order.address.city},{" "}
                            {order.address.country || "USA"}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="bg-emerald-500/10 text-emerald-500 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
                          {order.status || "In Progress"}
                        </span>

                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                          Method: {order.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                      {order.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 bg-[#0b1120]/80 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center p-2 shrink-0 border border-white/5">
                            <img
                              src={item.image}
                              alt=""
                              className="max-h-full object-contain"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-bold truncate text-white">
                              {item.name}
                            </p>

                            <p className="text-[10px] text-emerald-500 font-black mt-1">
                              {item.qty} × ${item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-[9px] font-black uppercase tracking-[0.3em]">
                          Settlement Amount
                        </span>

                        <h3 className="text-3xl lg:text-4xl font-black text-white italic">
                          $
                          {(order.totalAmount || order.total)?.toLocaleString()}
                        </h3>
                      </div>

                      <button
                        disabled={order.status === "Delivered"}
                        onClick={() => cancelOrder(order.orderId)}
                        className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all group
                          ${
                            order.status === "Delivered"
                              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                              : "bg-red-500/5 text-red-500/50 hover:bg-red-500 hover:text-white"
                          }`}
                      >
                        <RiCloseCircleLine
                          size={18}
                          className="group-hover:rotate-90 transition-transform"
                        />
                        Abort Order
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
