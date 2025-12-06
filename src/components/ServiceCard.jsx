import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
    const { _id, service_name, image, price, description, provider_image, provider_name } = service;

    return (
        <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <figure className="relative h-64 overflow-hidden">
                <img src={image} alt={service_name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 badge badge-secondary badge-lg shadow-sm">
                    ${price}
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold text-gray-800">
                    {service_name}
                </h2>
                <p className="text-gray-500 line-clamp-2">
                    {description}
                </p>
                
                {/* Provider Info */}
                <div className="flex items-center gap-3 mt-4 mb-4">
                    <div className="avatar">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={provider_image} alt={provider_name} />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{provider_name}</p>
                        <p className="text-xs text-gray-400">Verified Decorator</p>
                    </div>
                </div>

                <div className="card-actions justify-end">
                    <Link to={`/services/${_id}`} className="btn btn-primary w-full bg-orange-500 border-none text-white hover:bg-orange-600">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;