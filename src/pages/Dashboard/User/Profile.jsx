import { useEffect, useState } from "react";
// আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী useAuth ইম্পোর্ট করুন
import useAuth from "../../../hooks/useAuth"; 
import { toast } from "react-toastify";
import { FaUserEdit, FaCamera, FaEnvelope, FaIdBadge, FaLink } from "react-icons/fa";

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    
    // Form States
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    // ইউজার ডাটা লোড হলে স্টেটে সেট করা (যাতে ইনপুট ফিল্ডে আগের নাম থাকে)
    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || "");
            setPhotoURL(user.photoURL || "");
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // AuthContext এর updateUserProfile কল করা হচ্ছে
            await updateUserProfile(displayName, photoURL);
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
                
                {/* ---------- LEFT SIDE: Profile Preview (Gradient) ---------- */}
                <div className="lg:w-2/5 bg-gradient-to-br from-indigo-600 via-purple-600 to-primary text-white p-10 flex flex-col items-center justify-center text-center relative">
                    
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pattern-dots"></div>

                    <div className="z-10 relative w-full flex flex-col items-center">
                        {/* Avatar */}
                        <div className="avatar online mb-6">
                            <div className="w-36 rounded-full ring-4 ring-white/30 ring-offset-2 ring-offset-transparent shadow-2xl">
                                <img 
                                    src={photoURL || user.photoURL || "https://i.ibb.co/0s3pdnc/avatar.png"} 
                                    alt="User Profile" 
                                    className="object-cover"
                                    onError={(e) => e.target.src = "https://i.ibb.co/0s3pdnc/avatar.png"} // Broken Link Fix
                                />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-2 drop-shadow-md">
                            {user.displayName || "User Name"}
                        </h2>
                        
                        <div className="badge badge-accent badge-lg shadow-lg font-semibold uppercase tracking-wide mt-2">
                            {/* Role চেক করার লজিক (আপনার AuthContext এ যেভাবে আছে) */}
                            {user.email === "alamin16105@gmail.com" ? "Admin" : "User"}
                        </div>
                        
                        {/* Info Boxes */}
                        <div className="mt-10 w-full space-y-3">
                            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-md border border-white/10 transition-transform hover:scale-105">
                                <FaEnvelope className="text-lg opacity-80" />
                                <span className="text-sm font-medium truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-md border border-white/10 transition-transform hover:scale-105">
                                <FaIdBadge className="text-lg opacity-80" />
                                <span className="text-sm font-medium truncate" title={user.uid}>
                                    ID: {user.uid?.slice(0, 15)}...
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

                    <form onSubmit={handleUpdate} className="space-y-6">
                        
                        {/* Name Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-base-content/80">Full Name</span>
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Enter your full name"
                                className="input input-bordered input-primary w-full h-12 focus:ring-2 focus:ring-primary/40 bg-base-200/40"
                                required
                            />
                        </div>

                        {/* Photo URL Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-base-content/80">Profile Photo URL</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLink className="text-gray-400" />
                                </div>
                                <input
                                    type="url"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    placeholder="https://example.com/photo.jpg"
                                    className="input input-bordered input-primary w-full pl-10 h-12 focus:ring-2 focus:ring-primary/40 bg-base-200/40"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <FaCamera className="text-primary cursor-pointer hover:text-primary-focus" />
                                </div>
                            </div>
                            <label className="label">
                                <span className="label-text-alt text-base-content/60">
                                    Provide a valid direct image link (e.g., from ImgBB).
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 pt-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn btn-primary w-full text-lg font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 h-12"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Profile;