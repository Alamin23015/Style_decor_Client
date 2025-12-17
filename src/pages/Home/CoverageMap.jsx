import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CoverageMap = () => {
  return (
    <div className="py-20 container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Service <span className="text-accent">Coverage</span></h2>
      <div className="h-[450px] rounded-3xl overflow-hidden shadow-2xl border-8 border-base-200">
        <MapContainer center={[23.8103, 90.4125]} zoom={7} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[23.8103, 90.4125]}><Popup>Main Office: Dhaka</Popup></Marker>
        </MapContainer>
      </div>
    </div>
  );
};
export default CoverageMap;