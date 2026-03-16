import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import toast from "react-hot-toast";

export const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Session Terminated. Logged out.");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN LOGIC

        const response = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const user = await response.json();

        if (response.ok) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.user));
          toast.success(`Welcome back ${user.name}`);
          navigate("/");
        } else {
          toast.error(user.message);
        }
      } else {
        // REGISTER logic
        const response = await fetch("http://localhost:4000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Registration Successful");
          setIsLogin(true);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error("Network Error: Cannot reach authorization server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b1120] text-white min-h-screen flex items-center justify-center p-6 selection:bg-emerald-500/30">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        layout
        className="w-full max-w-md bg-[#111a2e]/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 shadow-2xl relative z-10"
      >
        {loggedInUser ? (
          /* Profile View */
          <div className="text-center space-y-6">
            <div className="relative w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-emerald-500 text-3xl font-black uppercase">
                {loggedInUser.name.charAt(0)}
              </span>
              {loggedInUser.role === "admin" && (
                <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-indigo-500/40">
                  Admin
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                Hi, {loggedInUser.name}
              </h2>
              <p className="text-gray-500 text-sm">{loggedInUser.email}</p>
            </div>

            {/* Admin Dashboard Button - Path Fixed to Lowercase */}
            {loggedInUser.role === "admin" && (
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="w-full bg-indigo-500 text-white font-black py-4 rounded-2xl hover:bg-white hover:text-indigo-500 transition-all uppercase tracking-widest text-xs shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 border border-indigo-500/20"
              >
                Admin Dashboard
              </button>
            )}

            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-emerald-500 text-slate-900 font-black py-4 rounded-2xl hover:bg-white transition-all uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
            >
              My Order History
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs"
            >
              Logout from Account
            </button>

            <button
              onClick={() => navigate("/products")}
              className="w-full text-gray-500 hover:text-white text-xs font-bold transition-colors"
            >
              Return to Store
            </button>
          </div>
        ) : (
          /* Login/Register Form */
          <>
            <div className="text-center mb-10">
              <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                <span className="text-[#0b1120] font-black text-2xl">E</span>
              </div>
              <h2 className="text-3xl font-black">
                {isLogin ? "Welcome " : "Join the "}
                <span className="text-emerald-500">
                  {isLogin ? "Back" : "Squad"}
                </span>
              </h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500 ml-4 mb-2 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-[#0b1120] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all text-white"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500 ml-4 mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                  className="w-full bg-[#0b1120] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all text-white"
                />
              </div>

              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500 ml-4 mb-2 block">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-[#0b1120] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all text-white"
                />
                {/* Password Toggle Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-[42px] text-gray-500 hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash size={20} />
                  ) : (
                    <HiOutlineEye size={20} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 text-[#0b1120] font-black py-4 rounded-2xl mt-4 hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-500/10 disabled:opacity-50 uppercase tracking-widest text-xs"
              >
                {loading
                  ? "PROCESSING..."
                  : isLogin
                    ? "SIGN IN"
                    : "CREATE ACCOUNT"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-xs">
                {isLogin ? "Don't have an account?" : "Already a member?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-500 font-bold ml-2 hover:underline underline-offset-4"
                >
                  {isLogin ? "Register Now" : "Login here"}
                </button>
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
