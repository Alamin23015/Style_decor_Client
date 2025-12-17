import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
            <motion.h1 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-9xl font-extrabold text-primary"
            >
                404
            </motion.h1>
            
            <h2 className="text-4xl font-bold mt-4 mb-6">Oops! Page Not Found</h2>
            <p className="text-lg mb-8 max-w-md text-base-content/70">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link to="/">
                <button className="btn btn-primary btn-lg rounded-full px-8 shadow-lg">
                    Go Back Home
                </button>
            </Link>
        </div>
    );
};

export default ErrorPage;