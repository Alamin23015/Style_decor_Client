import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
       
        axios.get(`http://localhost:5000/services`)
            .then(res => setServices(res.data.slice(0, 3)));
    }, []);

    return (
        <div>
            
            <div className="hero min-h-[600px]" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop)'}}>
                <div className="hero-overlay bg-black bg-opacity-50"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-6xl font-bold font-serif text-white">Dream Event</h1>
                        <p className="mb-8 text-lg text-gray-200">
                            We bring your dream events to life with our premium decoration services.
                        </p>
                        <Link to="/services" className="btn btn-primary bg-orange-500 border-none px-8 text-white text-lg">Book Now</Link>
                    </div>
                </div>
            </div>

      
            <div className="my-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Top Services</h2>
                    <p className="text-gray-500 w-1/2 mx-auto">Explore our wide range of decoration services tailored for your special occasions.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        services.map(service => <ServiceCard key={service._id} service={service} />)
                    }
                </div>

                <div className="text-center mt-12">
                    <Link to="/services" className="btn btn-outline btn-primary px-10">See All Services</Link>
                </div>
            </div>

           
            <div className="bg-orange-50 py-20">
                <div className="text-center max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-10">Why Choose StyleDecor?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        <div className="p-8 bg-white rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-2">Professional Teams</h3>
                            <p className="text-gray-500">We have the best decorators in town.</p>
                        </div>
                        <div className="p-8 bg-white rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
                            <p className="text-gray-500">Premium service within your budget.</p>
                        </div>
                        <div className="p-8 bg-white rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-2">On-Time Execution</h3>
                            <p className="text-gray-500">We value your time and event schedule.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;