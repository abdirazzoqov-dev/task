// src/data-config/userService.ts
import localforage from 'localforage';
import type { User, MapPolygon } from '../types/User';

const userStore = localforage.createInstance({ name: 'user_management_db', storeName: 'users' });
const mapStore = localforage.createInstance({ name: 'user_management_db', storeName: 'polygons' });

// ... (getUser, updateUser, deleteUser kodlari avvalgi javobdan o'zgarmaydi)

export const createPolygon = async (coords: { lat: number; lng: number }[]): Promise<MapPolygon> => {
    const newPolygon: MapPolygon = {
        id: Date.now().toString(),
        coords,
        createdAt: Date.now(),
    };
    await mapStore.setItem(newPolygon.id, newPolygon);
    return newPolygon;
};

export const getPolygons = async (): Promise<MapPolygon[]> => {
    const polygons: MapPolygon[] = [];
    await mapStore.iterate<MapPolygon, any>((value) => {
        polygons.push(value);
    });
    return polygons;
};