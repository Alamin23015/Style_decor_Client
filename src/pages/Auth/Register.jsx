import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ডিফল্ট ছবি (যেহেতু আপলোড বাদ দিয়েছি)
  const defaultPhotoURL = "https://i.ibb.co/5GzXkwq/user.png"; 

  const saveUserToDB = async (name, email, image) => {
    const userInfo = {
      name: name,
      email: email,
      image: image,
      // role সার্ভার ঠিক করবে
    };
    
    return axios.post('http://localhost:5000/users', userInfo);
  };

  const onSubmit = async (data) => {
    try {
     
      await createUser(data.email, data.password);

      
      await updateUserProfile(data.name, defaultPhotoURL);

     
      await saveUserToDB(data.name, data.email, defaultPhotoURL);

      toast.success("Registration Successful!");
      reset();
      navigate("/"); 
    } catch (err) {
      console.error(err);
     
      if (err.response) {
         toast.error(`Server Error: ${err.response.data.message || err.response.statusText}`);
      } else {
         toast.error(err.message || "Registration failed");
      }
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;
      await saveUserToDB(user.displayName, user.email, user.photoURL);
      toast.success("Google Login Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 py-10">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-primary">Register Now!</h1>
          <p className="py-6 text-lg">Create an account to get started.</p>
        </div>
        
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100 border border-base-300">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-4">
            
        
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Name</span></label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="input input-bordered focus:input-primary"
              />
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
            </div>

          
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Email</span></label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="email@example.com"
                className="input input-bordered focus:input-primary"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>

            
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Password</span></label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be 6+ characters" },
                })}
                placeholder="••••••••"
                className="input input-bordered focus:input-primary"
              />
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary text-white text-lg">Register</button>
            </div>
          </form>

         
          <div className="px-8 pb-8">
            <div className="divider text-base-content/60">OR</div>
            <button
              onClick={handleGoogle}
              type="button"
              className="btn btn-outline w-full flex items-center gap-2 hover:bg-base-200"
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>

            <p className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;