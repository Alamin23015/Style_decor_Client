import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Login Successful! Welcome back");
      form.reset();
      navigate(from, { replace: true });
    } catch (err) {
      const errorMsg = err.message.includes("wrong-password")
        ? "Wrong password!"
        : err.message.includes("user-not-found")
        ? "No account found with this email!"
        : "Login failed! Please try again.";
      toast.error(errorMsg);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      toast.success("Google Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google Login Failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-10">
      <div className="card w-full max-w-[450px] shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body p-10">
          <h2 className="text-4xl font-bold text-center text-sky-700 mb-6">
            Login
          </h2>

         
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              required
            />
          </div>

        
          <div className="form-control w-full mt-4">
            <label className="label flex justify-between items-center">
              <span className="label-text font-semibold text-gray-700">Password</span>
              <a href="#" className="label-text-alt link link-hover text-sky-600 font-medium">
                Forgot password?
              </a>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              required
            />
          </div>

          
          <div className="form-control mt-8">
            <button className="btn bg-sky-600 hover:bg-sky-800 text-white text-lg font-bold w-full border-none">
              Login
            </button>
          </div>

          <div className="divider my-6 text-gray-500 font-medium">OR</div>

      
          <button
            type="button"
            onClick={handleGoogle}
            className="btn btn-outline w-full flex items-center justify-center gap-3 font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-400"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>

         
          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <span className="font-bold text-sky-700">
              <Link to="/register" className="link link-hover">
                Register Now
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;