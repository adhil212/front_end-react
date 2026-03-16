import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Slidesection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {

        const dataarry=data.data
       
        const headphone = dataarry.find(p => p.category === "Headphones") 
        const smartphone = dataarry.find(p => p.category === "Smartphones") 
        const laptop = dataarry.find(p => p.category === "Laptops") 

        
        const selected = [
          { ...headphone, bgColor: "bg-[#10B79F]", btnColor: "bg-black", label: "Wireless" },
          { ...smartphone, bgColor: "bg-emerald-100", btnColor: "bg-emerald-500", label: "Smart" },
          { ...laptop, bgColor: "bg-blue-100", btnColor: "bg-blue-500", label: "Premium" }
        ];

        setFeaturedProducts(selected);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching section data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative h-[320px] ${product.bgColor} rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden group shadow-2xl`}
            >
              
              <div className="z-10">
                <p className="text-gray-600 font-bold tracking-widest text-xs uppercase mb-1">
                    {product.label}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{product.name}</h3>
                <h3 className="text-5xl font-black opacity-10 tracking-tighter uppercase absolute top-16 left-8 -z-10">
                  {product.category}
                </h3>
                <button 
                  onClick={() => navigate(`/products/${product.id}`)}
                  className={`mt-4 ${product.btnColor} text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95`}
                >
                  Shop Now
                </button>
              </div>

              {/* Image */}
              <motion.img
                src={`http://localhost:4000/images${product.image}`}
                alt={product.name}
                whileHover={{ scale: 1.1, rotate: -5, y: -10 }}
                className="absolute -right-8 -bottom-4 w-[220px] md:w-[260px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] pointer-events-none transition-all duration-500 group-hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] object-contain h-full p-4"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slidesection;