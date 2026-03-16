import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AdminUsers = () => {
  const [user, userdata] = useState([]);
  const [usercount, setusercount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        userdata(data);
        setusercount(data.length);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  function changeRole(id) {
    const currentUser = user.find((u) => u.id === id);
    const newRole = currentUser.role === "user" ? "admin" : "user";

    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...currentUser, role: newRole }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        userdata((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
        toast.success(`Role updated to ${newRole}`);
      })
      .catch((err) => console.error(err));
  }

  function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        userdata((prev) => prev.filter((u) => u.id !== id));
        setusercount((prev) => prev - 1);
        toast.success("User deleted successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete user.");
      });
  }

  return (
    <div className="bg-[#0a0b14] min-h-screen py-6 md:py-10 px-4 w-full text-white font-sans">
      <div className="w-full max-w-[1200px] mx-auto">
        
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 px-2 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              Registered Users
            </h2>
            <div className="h-1.5 w-16 bg-indigo-500 mt-2 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
          </div>

          <div className="bg-[#11121e] px-6 py-3 rounded-2xl border border-gray-800 text-gray-400 font-bold text-sm shadow-xl w-full md:w-auto text-center">
            Total Users: <span className="text-indigo-400 ml-1">{usercount}</span>
          </div>
        </div>

        
        <div className="w-full">
          <div className="hidden md:grid grid-cols-12 px-8 mb-4 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">
            <div className="col-span-5">Member Details</div>
            <div className="col-span-2">Status / Role</div>
            <div className="col-span-2 text-center">Activity</div>
            <div className="col-span-3 text-right">Management</div>
          </div>

         
          <div className="flex flex-col gap-4">
            {user.map((v) => (
              <div
                key={v._id || v.id}
                className="group transition-all duration-300 hover:border-gray-600 flex flex-col md:grid md:grid-cols-12 items-center bg-[#11121e] p-4 md:px-8 md:py-5 rounded-2xl border border-gray-800 shadow-lg"
              >
               
                <div className="col-span-5 w-full flex items-center gap-5 mb-4 md:mb-0">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20 uppercase text-lg">
                    {v.name ? v.name.charAt(0) : "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-100 text-base md:text-lg leading-tight capitalize truncate">
                      {v.name}
                    </p>
                    <p className="text-xs text-gray-500 lowercase truncate mt-1">
                      {v.email}
                    </p>
                  </div>
                </div>

                
                <div className="col-span-2 w-full flex md:block justify-between items-center mb-4 md:mb-0 border-t border-gray-800 md:border-t-0 pt-4 md:pt-0">
                  <span className="md:hidden text-[10px] font-black text-gray-500 uppercase tracking-widest">Role</span>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      v.role === "user"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                    }`}
                  >
                    {v.role}
                  </span>
                </div>

               
                <div className="col-span-2 w-full flex md:block justify-between items-center mb-4 md:mb-0">
                  <span className="md:hidden text-[10px] font-black text-gray-500 uppercase tracking-widest">Activity</span>
                  <div className="text-center md:inline-block">
                    <p className="text-lg md:text-xl font-black text-white leading-none">
                      {v.orders ? v.orders.length : 0}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mt-1">
                      Orders
                    </p>
                  </div>
                </div>

                
                <div className="col-span-3 w-full flex flex-wrap md:flex-nowrap items-center justify-between md:justify-end gap-4 border-t border-gray-800 md:border-t-0 pt-5 md:pt-0">
                  <div className="flex gap-5 items-center">
                    <button
                      onClick={() => changeRole(v.id)}
                      className="text-[11px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors"
                    >
                      {v.role === "user" ? "Promote" : "Demote"}
                    </button>

                    {v.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(v.id)}
                        className="text-[11px] font-black text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => navigate(`/admin/users/${v.id}`)}
                    className="w-full md:w-auto bg-[#1c1d29] border border-gray-700 text-gray-200 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-700 hover:text-white transition-all active:scale-95 shadow-lg"
                  >
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};