import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Covarage = () => {
    // Map center
    const position = [23.6850, 90.3563]; // Bangladesh center
    const mapRef = useRef(null);

    const fixedMarker = {
        latitude: 23.8103, // Dhaka
        longitude: 90.4125,
        name: "Dhaka Service Center",
        covered_area: ["Dhaka", "Gulshan", "Banani"]
    };

    return (
        <div className="px-4 sm:px-6 md:px-12 py-8">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
                Our Service Coverage
            </h3>

            <div className="border w-full rounded-2xl overflow-hidden h-[300px] sm:h-[400px] md:h-[600px]">
                <MapContainer
                    center={position}
                    ref={mapRef}
                    zoom={8}
                    scrollWheelZoom={false}
                    className="w-full h-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Marker */}
                    <Marker position={[fixedMarker.latitude, fixedMarker.longitude]}>
                        <Popup>
                            <strong>{fixedMarker.name}</strong> <br />
                            Service Area: {(fixedMarker.covered_area || []).join(', ')}
                        </Popup>
                    </Marker>

                </MapContainer>
            </div>
        </div>
    );
};

export default Covarage;
