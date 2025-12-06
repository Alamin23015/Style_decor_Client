import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // সার্চ কোয়েরি সহ ডাটা আনা
        axios.get(`http://localhost:5000/services?search=${search}`)
            .then(res => {
                setServices(res.data);
                setLoading(false);
            });
    }, [search]); // সার্চ স্টেট চেঞ্জ হলে আবার ডাটা আনবে

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 my-10">
            {/* Header & Search */}
            <div className="text-center mb-12 bg-gray-100 py-12 rounded-2xl">
                <h2 className="text-4xl font-bold mb-6">All Decoration Services</h2>
                
                <div className="join">
                    <input 
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered join-item w-full max-w-xs" 
                        placeholder="Search for decoration..." 
                    />
                    <button className="btn join-item btn-primary bg-orange-500 border-none text-white">Search</button>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    services.length > 0 ? (
                        services.map(service => <ServiceCard key={service._id} service={service} />)
                    ) : (
                        <div className="col-span-3 text-center py-20">
                            <h3 className="text-2xl font-bold text-gray-400">No Services Found</h3>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Services;