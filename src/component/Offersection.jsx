import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const OfferCarousel = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const themes = [
    "from-[#064e3b] to-slate-950", 
    "from-blue-900 to-slate-950", 
    "from-purple-900 to-slate-950"
  ];

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        
        setOffers(data.data.slice(0, 3)); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching carousel data:", err);
        setLoading(false);
      });
  }, []);

  if (loading || offers.length === 0) return null;

  return (
    <section className="py-16 bg-slate-950">
      <div className="container mx-auto px-4 md:px-10">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          {offers.map((product, index) => (
            <SwiperSlide key={product.id}>
              <div className={`bg-gradient-to-br ${themes[index % themes.length]} p-8 md:p-16 flex flex-col md:flex-row items-center justify-between h-[550px] md:h-[600px] overflow-hidden relative`}>
                
                
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="md:w-1/2 text-center md:text-left z-10"
                >
                  <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">
                    {product.tag || "Limited Offer"}
                  </p>
                  <h2 className="text-white text-4xl md:text-6xl font-black mb-4 leading-tight">
                    <span className="block text-3xl md:text-5xl text-emerald-400">
                        {product.brand}
                    </span>
                    {product.name}
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg mb-8 max-w-md line-clamp-2">
                    {product.description}
                  </p>

                  <button 
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="bg-emerald-500 text-slate-950 font-black px-10 py-4 rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl text-sm tracking-widest"
                  >
                    SHOP NOW
                  </button>
                </motion.div>

                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="md:w-1/2 h-full flex justify-center items-center relative"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full max-w-[300px] md:max-w-[450px] max-h-[70%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] object-contain z-10"
                  />
                  
                 
                  <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full"></div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OfferCarousel;