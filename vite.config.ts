// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    // @react-leaflet/core topilmaslik xatosini hal qilish uchun yakuniy konfiguratsiya
    exclude: [
        '@react-leaflet/core', 
        'react-leaflet',
        'leaflet',
        'leaflet-draw',
        'react-leaflet-draw'
    ], 
  },
});