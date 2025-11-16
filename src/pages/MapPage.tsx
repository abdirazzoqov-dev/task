// src/pages/MapPage.tsx
import React, { useState } from 'react';
import Map, { NavigationControl, GeolocateControl, RequestTransformFunction } from 'react-map-gl';
import { MapDrawControlComponent } from '../components/custom/MapDrawControl';
import maplibregl from 'maplibre-gl';

// O'rta Osiyo uchun standart koordinatalar
const initialViewState = {
  longitude: 69.2797,
  latitude: 41.3111,
  zoom: 12,
  bearing: 0,
  pitch: 0,
};

export const MapPage: React.FC = () => {
  const [viewState, setViewState] = useState(initialViewState);
  
  // API kaliti talab qilmaydigan Maptiler xarita stili
  const MAP_STYLE_URL = "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL";

  return (
    <div className="p-4 h-[80vh]">
      <h2 className="text-2xl font-semibold mb-4">📍 Xaritada Polygon Chizish (MapLibre)</h2>
      <Map
        {...viewState}
        style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'grab' // 👈 Kursor stilini qo'shamiz
        }}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={MAP_STYLE_URL} 
        mapLib={maplibregl}        
        maxZoom={20}
        minZoom={0}
        
        // INTERAKTIVLIKNI MAJBURIY YOQISH
        dragPan={true} 
        scrollZoom={true} 
        dragRotate={true}
      >
        {/* Navigatsiya va joylashuv kontrollarini qo'shish */}
        <NavigationControl position="top-right" />
        
        {/* GeolocateControl: Foydalanuvchi joylashuvini jonli kuzatishni yoqish */}
        <GeolocateControl 
          position="top-right" 
          showUserLocation={true} 
          trackUserLocation={true} 
          positionOptions={{ enableHighAccuracy: true }}
        />
        
        {/* Polygon chizish uchun maxsus boshqaruv paneli */}
        <MapDrawControlComponent />
        
      </Map>
    </div>
  );
};