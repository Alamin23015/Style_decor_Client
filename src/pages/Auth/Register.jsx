import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // 1. Upload image to ImageBB
      const imgRes = await axios.post(image_hosting_api, formData);
      const photoURL = imgRes.data.data.display_url;

      // 2. Create user in Firebase
      await createUser(data.email, data.password);

      // 3. Update Firebase profile
      await updateUserProfile(data.name, photoURL);

      // 4. Save user to our MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        image: photoURL,
        role: "user",
      };
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/users/${data.email}`, userInfo);

      toast.success("Registration Successful!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google Login Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Register to StyleDecor</h1>
        </div>
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-6">
            <div className="form-control">
              <label className="label"><span className="label-text">Name</span></label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="input input-bordered"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="email@example.com"
                className="input input-bordered"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be 6+ characters" },
                })}
                placeholder="••••••••"
                className="input input-bordered"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Photo</span></label>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="file-input file-input-bordered file-input-primary w-full"
              />
              {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>

          <div className="divider px-8">OR</div>

          <div className="px-8 pb-8">
            <button
              onClick={handleGoogle}
              type="button"
              className="btn btn-outline w-full"
            >
              Continue with Google
            </button>

            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;