// src/types/User.ts
export type Gender = 'Male' | 'Female' | 'Other';
export interface User {
  id: string; 
  firstName: string;
  lastName: string;
  birthdate: string; 
  gender: Gender;
  createdAt: number; 
}
export interface MapPolygon {
  id: string;
  coords: { lat: number; lng: number }[];
  createdAt: number;
}