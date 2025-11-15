// src/components/custom/MapLayers.tsx
import React from 'react';
import { TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import * as userService from '../../data-config/userService'; 

const DrawControl = () => {
  const map = useMap(); // useLeafletContext xatosini hal qiladi
  
  const onCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const polygonCoords = layer.getLatLngs()[0].map((latlng: L.LatLng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      }));
      userService.createPolygon(polygonCoords)
        .then(() => console.log("Polygon saqlandi!"))
        .catch(err => console.error("Polygon saqlashda xato:", err));
    }
  };
  
  const onDeleted = (e: any) => {
      e.layers.eachLayer(() => { console.log("Qatlam o'chirildi."); });
  };

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />

      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreated}
          onDeleted={onDeleted}
          draw={{
            polygon: { showArea: true, allowIntersection: false },
            polyline: false, circle: false, marker: false, rectangle: false, circlemarker: false,
          }}
          // EditControl xatosini hal qilish uchun soddalashtirilgan konfiguratsiya
          edit={{
            edit: true,
            remove: true,
          }}
        />
      </FeatureGroup>
    </>
  );
};


export const MapLayers: React.FC = () => {
    return <DrawControl />; 
};