import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaUserEdit, FaCamera, FaEnvelope, FaIdBadge, FaLink, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    
    // 🔥 NEW: Database User State 🔥
    const [dbUser, setDbUser] = useState(null);

    // Form States
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [phone, setPhone] = useState("");     // 🔥 NEW 🔥
    const [address, setAddress] = useState(""); // 🔥 NEW 🔥

    // 🔥 NEW: Fetch Database Data 🔥
    useEffect(() => {
        if (user?.email) {
            // Firebase Data Set
            setDisplayName(user.displayName || "");
            setPhotoURL(user.photoURL || "");

            // Fetch Mongo Data
            axios.get(`${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/users/${user.email}`)
                .then(res => {
                    setDbUser(res.data);
                    // Set DB values to inputs
                    if(res.data?.phone) setPhone(res.data.phone);
                    if(res.data?.address) setAddress(res.data.address);
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Update Firebase (Name & Photo)
            await updateUserProfile(displayName, photoURL);

            // 2. Update Database (Phone & Address)
            const userInfo = {
                name: displayName,
                phone: phone,
                address: address,
                role: dbUser?.role || "user" // Role ঠিক রাখার জন্য
            };

            await axios.put(`${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/users/${user.email}`, userInfo);

            // 3. Update Local State UI
            setDbUser({ ...dbUser, ...userInfo });

            toast.success("Profile Updated Successfully! 🎉");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="text-center py-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 md:p-8">
            
            {/* Main Card Container */}
            <div className="card lg:card-side bg-base-100 shadow-2xl border border-base-200 max-w-5xl w-full overflow-hidden rounded-2xl">
                
                {/* ---------- LEFT SIDE: Profile Preview ---------- */}
                <div className="lg:w-2/5 bg-gradient-to-br from-indigo-600 via-purple-600 to-primary text-white p-10 flex flex-col items-center justify-center text-center relative">
                    
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pattern-dots"></div>

                    <div className="z-10 relative w-full flex flex-col items-center">
                        <div className="avatar online mb-6">
                            <div className="w-36 rounded-full ring-4 ring-white/30 ring-offset-2 ring-offset-transparent shadow-2xl">
                                <img 
                                    src={photoURL || user.photoURL || "https://i.ibb.co/0s3pdnc/avatar.png"} 
                                    alt="User Profile" 
                                    className="object-cover"
                                    onError={(e) => e.target.src = "https://i.ibb.co/0s3pdnc/avatar.png"} 
                                />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-2 drop-shadow-md">
                            {user.displayName || "User Name"}
                        </h2>
                        
                        <div className="badge badge-accent badge-lg shadow-lg font-semibold uppercase tracking-wide mt-2">
                            {/* 🔥 Show Role from DB 🔥 */}
                            {dbUser?.role || "User"}
                        </div>
                        
                        {/* Info Boxes with DB Data */}
                        <div className="mt-10 w-full space-y-3">
                            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-md border border-white/10">
                                <FaEnvelope className="text-lg opacity-80" />
                                <span className="text-sm font-medium truncate">{user.email}</span>
                            </div>
                            
                            {/* 🔥 Display Phone 🔥 */}
                            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-md border border-white/10">
                                <FaPhone className="text-lg opacity-80" />
                                <span className="text-sm font-medium truncate">
                                    {dbUser?.phone || "Phone Not Set"}
                                </span>
                            </div>

                            {/* 🔥 Display Address 🔥 */}
                            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-md border border-white/10">
                                <FaMapMarkerAlt className="text-lg opacity-80" />
                                <span className="text-sm font-medium truncate">
                                    {dbUser?.address || "Address Not Set"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------- RIGHT SIDE: Edit Form ---------- */}
                <div className="lg:w-3/5 p-8 md:p-12 bg-base-100">
                    <div className="flex items-center gap-3 mb-8 text-primary border-b pb-4 border-base-200">
                        <FaUserEdit className="text-3xl" />
                        <div>
                            <h3 className="text-2xl font-bold text-base-content">Edit Profile</h3>
                            <p className="text-sm text-base-content/60">Update your personal information</p>
                        </div>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        
                        {/* Name Input */}
                        <div className="form-control">
                            <label className="label font-bold">Full Name</label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="input input-bordered input-primary w-full bg-base-200/40"
                                required
                            />
                        </div>

                        {/* Photo URL Input */}
                        <div className="form-control">
                            <label className="label font-bold">Photo URL</label>
                            <div className="relative">
                                <FaLink className="absolute top-4 left-3 text-gray-400" />
                                <input
                                    type="url"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="input input-bordered input-primary w-full pl-10 bg-base-200/40"
                                />
                            </div>
                        </div>

                        {/* 🔥 NEW: Phone Input 🔥 */}
                        <div className="form-control">
                            <label className="label font-bold">Phone Number</label>
                            <div className="relative">
                                <FaPhone className="absolute top-4 left-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+880 1..."
                                    className="input input-bordered input-primary w-full pl-10 bg-base-200/40"
                                />
                            </div>
                        </div>

                       
                        <div className="form-control">
                            <label className="label font-bold">Address</label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute top-4 left-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Dhaka, Bangladesh"
                                    className="input input-bordered input-primary w-full pl-10 bg-base-200/40"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn btn-primary w-full font-bold shadow-lg h-12"
                            >
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;