// src/pages/Dashboard/Admin/ManageUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load users");
        setLoading(false);
      });
  }, []);

  const updateRole = (email, newRole) => {
    axios.put(`http://localhost:5000/users/${email}`, { role: newRole })
      .then(() => {
        toast.success(`User is now ${newRole}!`);
        setUsers(users.map(u => u.email === email ? { ...u, role: newRole } : u));
      })
      .catch(() => toast.error("Failed to update role"));
  };   // এই `}` আগে মিসিং ছিল — এখন ঠিক

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Manage Users ({users.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((u) => (
          <div key={u._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                  <img src={u.photoURL || "https://i.ibb.co/0s3pdnc/avatar.png"} alt={u.name} />
                </div>
              </div>
              <h3 className="text-2xl font-bold">{u.name}</h3>
              <p className="text-base-content/70">{u.email}</p>

              <div className="mt-5">
                <span className={`badge badge-lg font-bold px-6 py-3 ${
                  u.role === "admin" ? "badge-error" :
                  u.role === "decorator" ? "badge-info" : "badge-ghost"
                }`}>
                  {u.role.toUpperCase()}
                </span>
              </div>

              <div className="card-actions justify-center mt-6 gap-4">
                {u.role !== "admin" && (
                  <button onClick={() => updateRole(u.email, "admin")} className="btn btn-error">
                    Make Admin
                  </button>
                )}
                {u.role !== "decorator" && u.role !== "admin" && (
                  <button onClick={() => updateRole(u.email, "decorator")} className="btn btn-info">
                    Make Decorator
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;