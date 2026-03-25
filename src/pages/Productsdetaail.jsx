import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export const Productsdetaail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
 
  const [quantity, setQuantity] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch("http://localhost:4000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUser._id,
          productId: product._id,
          qty: quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Added to cart!");
    } catch (error) {
      toast.error(error.message || "Error adding to cart");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen bg-[#0b1120] flex items-center justify-center text-emerald-500 font-black italic animate-pulse">
        ANALYZING SPECS...
      </div>
    );
  if (!product)
    return (
      <div className="h-screen bg-[#0b1120] text-white flex items-center justify-center font-black">
        404 // NOT FOUND
      </div>
    );

  return (
    <div className="bg-[#0b1120] text-white h-screen overflow-hidden flex flex-col p-6 lg:px-20 lg:py-10 selection:bg-emerald-500/30">
      <div className="h-[40px]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-500 transition-colors font-bold uppercase text-[10px] tracking-widest"
        >
          <span>←</span> Back to Collection
        </button>
      </div>

      {/* MainContainer*/}
      <div className="flex-grow flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center max-w-7xl mx-auto w-full overflow-hidden">
        {/* IMAGE  */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full lg:w-1/2 flex justify-center items-center h-1/2 lg:h-auto"
        >
          <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 md:p-12 aspect-square max-h-full flex items-center justify-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full"></div>

            <img
              src={
                product.image
              }
              alt={product.name}
              className="max-h-full w-auto object-contain z-10 group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300?text=Image+Not+Found";
              }}
            />
          </div>
        </motion.div>

        {/*  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-1/2 flex flex-col justify-center space-y-6"
        >
          <div>
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">
              {product.brand} // {product.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-3">
              {product.name}
            </h1>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed line-clamp-3">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-4xl lg:text-5xl font-black text-white">
              ${product.price}
            </span>
            <div className="h-10 w-[1px] bg-white/10"></div>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest italic leading-tight">
              Authorized <br />
              Dealer
            </span>
          </div>

          {/*  */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl overflow-hidden h-12">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 hover:bg-emerald-500 hover:text-slate-900 transition-colors font-bold"
              >
                -
              </button>
              <span className="px-4 font-black text-md">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="px-4 hover:bg-emerald-500 hover:text-slate-900 transition-colors font-bold"
              >
                +
              </button>
            </div>

            <button
              disabled={isProcessing || product.stock === 0}
              onClick={handleAddToCart}
              className="flex-grow max-w-[300px] h-12 bg-emerald-500 text-[#0b1120] font-black rounded-xl hover:bg-white active:scale-95 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-[11px] disabled:opacity-50"
            >
              {product.stock === 0
                ? "Out of Stock"
                : isProcessing
                  ? "Adding..."
                  : "Add to Cart"}
            </button>
          </div>

          {/* */}
          <div className="pt-4 border-t border-white/5 flex gap-10">
            <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
              ✓ Free Shipping
            </div>
            <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
              ✓ 2 Year Warranty
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
