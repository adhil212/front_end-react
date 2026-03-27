import  { useState } from "react";
import toast from "react-hot-toast";

export const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    description: "",
    image: null,
    tag: "",
  });

  function formfunction(e) {
    const { name, value, type, files } = e.target;
    if (!name) return;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }
  async function handlefunction(e) {
  e.preventDefault();

  if (!form.image) {
    return toast.error("Please select an image first");
  }

  const toastId = toast.loading("Uploading product to secure database...");

  try {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", Number(form.price));
    formData.append("stock", Number(form.stock));
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("tag", form.tag);
    formData.append("image", form.image); 

    const res = await fetch("http://localhost:4000/admin/products/add", {
      method: "POST",
      body: formData, 
    });

    if (!res.ok) throw new Error();

    toast.success("Product Saved!", { id: toastId });

  } catch (err) {
    console.error(err);
    toast.error("Upload Failed: Check connection", { id: toastId });
  }
}

  // function handlefunction(e) {
  //   e.preventDefault();

  //   if (!form.image) {
  //     return toast.error("Please select an image first");
  //   }

  //   const toastId = toast.loading("Uploading product to secure database...");

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     const product = {
  //       name: form.name,
  //       description: form.description,
  //       price: Number(form.price),
  //       stock: Number(form.stock),
  //       category: form.category,
  //       brand: form.brand,
  //       tag: form.tag,
  //       image: reader.result,
  //     };

  //     fetch("http://localhost:5000/products", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(product),
  //     })
  //       .then((res) => {
  //         if (!res.ok) throw new Error("Server Error");
  //         return res.json();
  //       })
  //       .then((data) => {
  //         toast.success("Product Saved!", { id: toastId });
  //       })
  //       .catch((err) => {
  //         console.error("Error:", err);
  //         toast.error("Upload Failed: Check connection", { id: toastId });
  //       });
  //   };

  //   reader.readAsDataURL(form.image);
  // }

  
  const inputStyle = "w-full p-3 bg-[#1c1d29] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all";

  return (
    <div className="min-h-screen bg-[#0a0b14] p-4 md:p-8 flex justify-center w-full overflow-x-hidden font-sans">
      <div className="w-full max-w-[1100px] bg-[#11121e] rounded-2xl border border-gray-800 p-6 md:p-10 shadow-2xl">
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Add New Product
          </h2>
          <p className="text-gray-400 text-sm mt-1">Fill in the details to list a new item in your store.</p>
        </header>

        <form
          onSubmit={handlefunction}
          onChange={formfunction}
          className="space-y-6"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Product Name</label>
              <input
                required
                name="name"
                type="text"
                placeholder="e.g. Wireless Headphones"
                className={inputStyle}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Price ($)</label>
              <input
                required
                type="number"
                name="price"
                min={0}
                placeholder="0.00"
                className={inputStyle}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Stock Quantity</label>
              <input
                required
                type="number"
                name="stock"
                min={0}
                placeholder="Quantity"
                className={inputStyle}
              />
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Category</label>
              <select
                name="category"
                required
                className={`${inputStyle} appearance-none`}
              >
                <option value="" className="bg-[#11121e]">Select Category</option>
                <option value="Laptops" className="bg-[#11121e]">Laptops</option>
                <option value="Smartphones" className="bg-[#11121e]">Smartphones</option>
                <option value="Headphones" className="bg-[#11121e]">Headphones</option>
                <option value="Tablets" className="bg-[#11121e]">Tablets</option>
                <option value="Accessories" className="bg-[#11121e]">Accessories</option>
                <option value="Wearables" className="bg-[#11121e]">Wearables</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Brand Name</label>
              <input
                name="brand"
                required
                type="text"
                placeholder="e.g. Sony, Apple"
                className={inputStyle}
              />
            </div>
          </div>

          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Description</label>
            <textarea
              name="description"
              required
              placeholder="Tell your customers about this product..."
              rows="4"
              className={`${inputStyle} resize-none`}
            ></textarea>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Product Image</label>
              <div className="relative border border-gray-800 bg-[#1c1d29] rounded-xl p-2">
                <input
                  name="image"
                  required
                  type="file"
                  className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#0a0b14] file:text-indigo-400 hover:file:bg-[#11121e] cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Promotion Tag</label>
              <input
                name="tag"
                type="text"
                placeholder="NEW, SALE, BESTSELLER"
                className={inputStyle}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 text-lg active:scale-[0.98]"
            >
              Confirm & Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};