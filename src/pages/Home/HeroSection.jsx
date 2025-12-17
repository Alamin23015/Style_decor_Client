import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="hero min-h-[90vh] bg-base-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 -z-10"></div>

      <div className="hero-content flex-col lg:flex-row-reverse gap-12 px-6 max-w-7xl mx-auto">
        
        <motion.div 
          className="flex-1 w-full relative"
          initial="hidden"
          whileInView="visible"
          variants={fadeRight}
        >
          <div className="relative w-full h-[450px] md:h-[550px]">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-8 border-base-100"
              alt="Luxury Decoration"
            />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/50"
            >
                <div className="radial-progress text-primary font-bold text-xs" style={{"--value":98, "--size": "3rem"}}>98%</div>
                <div>
                    <p className="font-bold text-gray-800">Client Satisfaction</p>
                    <p className="text-xs text-gray-500">Based on 500+ reviews</p>
                </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 text-left space-y-7"
          initial="hidden"
          whileInView="visible"
          variants={fadeLeft}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            #1 Event Styling Agency
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1]">
            Elevate Your <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              Special Moments
            </span>
          </h1>

          <p className="text-lg text-base-content/70 max-w-lg leading-relaxed">
            Experience the art of celebration with our premium decoration services. We turn your dream venue into a breathtaking reality.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/services">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg rounded-full px-8  shadow-lg shadow-primary/30"
              >
                Book Now
              </motion.button>
            </Link>
            
            <Link to="/about">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-ghost btn-lg rounded-full px-8 border border-base-content/20 hover:bg-base-200"
              >
                View Gallery
              </motion.button>
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-4 opacity-80">
            <div className="avatar-group -space-x-4 rtl:space-x-reverse">
              <div className="avatar border-none">
                <div className="w-10">
                  <img src="https://i.pravatar.cc/150?img=32" />
                </div>
              </div>
              <div className="avatar border-none">
                <div className="w-10">
                  <img src="https://i.pravatar.cc/150?img=12" />
                </div>
              </div>
              <div className="avatar border-none">
                <div className="w-10">
                  <img src="https://i.pravatar.cc/150?img=41" />
                </div>
              </div>
            </div>
            <p className="text-sm font-medium">Trusted by 2k+ happy customers</p>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;