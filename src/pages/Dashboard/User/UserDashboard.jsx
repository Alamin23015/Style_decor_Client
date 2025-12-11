// src/pages/Dashboard/User/Profile.jsx
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    updateUserProfile(name, photo)
      .then(() => toast.success("Profile updated!"))
      .catch(() => toast.error("Update failed"));
  };

  if (!user) return <div className="text-center py-20">Please login</div>;

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="avatar mb-8">
          <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
            <img src={user.photoURL || "https://i.ibb.co/0s3pdnc/avatar.png"} alt="Profile" />
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-4">{user.displayName || "User"}</h2>
        <p className="text-xl text-base-content/70 mb-8">{user.email}</p>

        <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-md mx-auto">
          <input type="text" placeholder="Full Name" defaultValue={user.displayName} name="name" className="input input-bordered w-full" />
          <input type="url" placeholder="Photo URL" defaultValue={user.photoURL} name="photo" className="input input-bordered w-full" />
          <button type="submit" className="btn btn-primary w-full">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;