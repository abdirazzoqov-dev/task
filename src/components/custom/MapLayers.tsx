// src/components/custom/MapLayers.tsx
import React from 'react';
import Map, { MapProvider, NavigationControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { MapDrawControlComponent } from './MapDrawControl';

export const MapLayers: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapProvider>
        <Map
          mapLib={maplibregl}
          initialViewState={{
            longitude: 69.24, // Toshkent
            latitude: 41.29,
            zoom: 10,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://demotiles.maplibre.org/style.json"
        >
          <NavigationControl position="top-left" />
          <MapDrawControlComponent />
        </Map>
      </MapProvider>
    </div>
  );
};