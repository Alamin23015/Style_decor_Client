// src/pages/Home/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6"
          >
            Transform Your Space<br />With StyleDecor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-base-content/80 mb-10 max-w-3xl mx-auto"
          >
            Professional home & ceremony decoration services across Bangladesh. Book your dream setup today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/services" className="btn btn-primary btn-lg rounded-full px-10 shadow-2xl text-lg">
              Explore Services
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg rounded-full px-10 text-lg">
              Get Quote
            </Link>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* আরো সেকশন পরে যোগ করবো */}
    </>
  );
};

export default Home;