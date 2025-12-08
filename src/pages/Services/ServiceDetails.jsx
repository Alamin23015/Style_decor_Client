import { useParams } from "react-router-dom";
const ServiceDetails = () => {
  const { id } = useParams();
  return <div className="min-h-screen p-10 text-center">
    <h1 className="text-4xl font-bold">Service Details</h1>
    <p className="text-2xl mt-4">ID: {id}</p>
  </div>;
};
export default ServiceDetails;