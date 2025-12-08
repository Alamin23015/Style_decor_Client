import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth"; // আপনার হুক ইম্পোর্ট পাথ ঠিক আছে তো?

const Login = () => {
    // 1. Hooks & Logic from the "Working Code"
    const { signIn, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // 2. Submit Handler
    const onSubmit = async (data) => {
        try {
            await signIn(data.email, data.password);
            toast.success("Login Successful!");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message);
        }
    };

    // 3. Google Handler
    const handleGoogle = async () => {
        try {
            await googleLogin();
            toast.success("Google Login Successful!");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message);
        }
    };

    // 4. Return JSX (Design from "First Code" + Logic injected)
    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 px-4 py-10">
            <div className="card w-full max-w-[450px] bg-base-100 shadow-xl border border-base-300 rounded-2xl">
                
                {/* Form Starts Here */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body p-10">
                    
                    {/* Title */}
                    <h2 className="text-4xl font-extrabold text-center text-primary mb-4">
                        Welcome Back
                    </h2>
                    <p className="text-center mb-6 text-base-content/80">
                        Login to continue your journey
                    </p>

                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input 
                            type="email" 
                            placeholder="your.email@example.com"
                            className={`input input-bordered rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors.email ? 'input-error' : ''}`}
                            {...register("email", { required: "Email is required" })}
                        />
                        {/* Error Message */}
                        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                    </div>

                    {/* Password Input */}
                    <div className="form-control mt-4">
                        <label className="label flex justify-between">
                            <span className="label-text font-semibold">Password</span>
                            <Link to="#" className="label-text-alt link text-primary">Forgot?</Link>
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            className={`input input-bordered rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors.password ? 'input-error' : ''}`}
                            {...register("password", { required: "Password is required" })}
                        />
                        {/* Error Message */}
                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    {/* Login Button */}
                    <button className="btn bg-primary hover:bg-primary-focus text-white text-lg font-semibold w-full mt-8 rounded-lg">
                        Login
                    </button>

                    {/* Divider */}
                    <div className="divider text-base-content/60">OR</div>

                    {/* Google Button */}
                    <button 
                        type="button" // type button is crucial to prevent form submit
                        onClick={handleGoogle}
                        className="btn btn-outline w-full rounded-lg flex items-center gap-3 font-medium bg-base-100 hover:bg-base-200 border-base-300"
                    >
                        <FcGoogle className="text-2xl" />
                        Continue with Google
                    </button>

                    {/* Footer Links (Adapted to match logic) */}
                    <p className="text-center mt-8 text-base-content/70">
                        Don’t have an account?{" "}
                        <Link to="/register" className="font-semibold text-primary link link-hover">
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;