// src/pages/MapPage.tsx
import React from 'react';
import { MapContainer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import { MapLayers } from '../components/custom/MapLayers'; 

// Leaflet ikonka xatosini tuzatish
delete (L.Icon.Default.prototype as any)._getIconUrl; 
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png', 
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

const initialCenter: LatLngTuple = [41.3111, 69.2797]; 

export const MapPage: React.FC = () => {
  return (
    <div className="p-4 h-[80vh]">
      <h2 className="text-2xl font-semibold mb-4">📍 Xaritada Polygon Chizish</h2>
      
      <MapContainer 
        center={initialCenter} 
        zoom={12} 
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg shadow-lg"
      >
        <MapLayers /> 
      </MapContainer>
    </div>
  );
};