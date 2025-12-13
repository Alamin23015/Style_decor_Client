import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // টোকেন হুক
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // axiosSecure ব্যবহার করার ফলে baseUrl আর প্রয়োজন নেই
    axiosSecure.get('/admin/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load users");
        setLoading(false);
      });
  }, [axiosSecure]);

  const updateRole = (email, newRole) => {
    axiosSecure.put(`/users/${email}`, { role: newRole })
      .then(() => {
        toast.success(`User is now ${newRole}!`);
        setUsers(users.map(u => u.email === email ? { ...u, role: newRole } : u));
      })
      .catch(() => toast.error("Failed to update role"));
  };  

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Manage Users ({users.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((u) => (
          <div key={u._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                  <img src={u.photoURL || "https://i.ibb.co/0s3pdnc/avatar.png"} alt={u.name} />
                </div>
              </div>
              <h3 className="text-xl font-bold">{u.name}</h3>
              <p className="text-sm opacity-70">{u.email}</p>
              <div className="mt-4">
                <span className={`badge badge-lg font-bold px-4 py-3 ${u.role === "admin" ? "badge-error" : u.role === "decorator" ? "badge-info" : "badge-ghost"}`}>
                  {u.role?.toUpperCase()}
                </span>
              </div>
              <div className="card-actions justify-center mt-6 gap-2">
                {u.role !== "admin" && <button onClick={() => updateRole(u.email, "admin")} className="btn btn-error btn-sm">Make Admin</button>}
                {u.role !== "decorator" && u.role !== "admin" && <button onClick={() => updateRole(u.email, "decorator")} className="btn btn-info btn-sm">Make Decorator</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;