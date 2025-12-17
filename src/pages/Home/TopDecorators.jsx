import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 

const TopDecorators = () => {
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    
    axiosSecure.get("/decorators")
      .then((res) => {
        setDecorators(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching decorators:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="py-20 bg-base-200/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Top <span className="text-secondary">Decorators</span>
        </h2>

        {decorators.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-xl">No decorators found at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {decorators.map((d) => (
              <div
                key={d._id}
                className="card bg-base-100 p-8 shadow-xl items-center text-center border border-base-200 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="avatar mb-4">
                  <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                    
                    <img
                      src={d.image || d.photoURL || "https://i.ibb.co/0s3pdnc/avatar.png"}
                      alt={d.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://i.ibb.co/0s3pdnc/avatar.png";
                      }}
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold">{d.name || "Unknown Decorator"}</h3>
                
                <p className="opacity-70 text-sm font-medium text-primary uppercase tracking-wide mt-1">
                  {d.specialty || "Expert Decorator"}
                </p>
                
                <div className="mt-3 flex items-center justify-center gap-1 text-yellow-500 font-bold text-lg bg-yellow-50 px-3 py-1 rounded-full">
                  ⭐ <span>{d.rating || "5.0"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopDecorators;