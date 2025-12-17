
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

 
  const saveUserToDB = async (name, email, photo) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/users`,
        { name, email, photoURL: photo, role: "user" }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
  
      await createUser(data.email, data.password);
      
  
      await updateUserProfile(data.name, data.photo);
      
   
      await saveUserToDB(data.name, data.email, data.photo);
      
      toast.success("Account created successfully! Welcome!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googleLogin();
      await saveUserToDB(result.user.displayName, result.user.email, result.user.photoURL);
      toast.success("Welcome back with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 py-12 px-4">
      <div className="w-full max-w-md">
      
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
         
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
            <h1 className="text-4xl font-bold text-white">Join StyleDecor</h1>
            <p className="text-white/90 mt-2">Create your account in seconds</p>
          </div>

         
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
           
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full focus:input-primary transition"
                />
                {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
              </div>

             
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Photo URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  {...register("photo", { required: "Photo URL is required" })}
                  className="input input-bordered w-full focus:input-primary transition"
                />
                {errors.photo && <p className="text-error text-sm mt-1">{errors.photo.message}</p>}
              </div>

             
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full focus:input-primary transition"
                />
                {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
              </div>

              
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    // ✅ Password Validation Requirement: Uppercase & Lowercase
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[a-z])/,
                      message: "Must contain at least one uppercase and one lowercase letter"
                    }
                  })}
                  className="input input-bordered w-full focus:input-primary transition"
                />
                {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
              </div>

              
              <button
                type="submit"
                className="btn btn-primary w-full text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all mt-4"
              >
                Create Account
              </button>
            </form>

            <div className="divider my-6 text-base-content/60">OR</div>

      
            <button
              onClick={handleGoogle}
              className="btn btn-outline w-full flex items-center justify-center gap-3 text-lg font-medium hover:bg-base-200 transition"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>

           
            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-base-content/70">
          By registering, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">Terms</a> and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Register;