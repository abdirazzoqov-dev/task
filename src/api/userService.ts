// src/api/userService.ts
import localforage from 'localforage';
import type { User } from '../types/User';

// IndexedDB/LocalForage kolleksiyasini sozlash
const store = localforage.createInstance({
  name: 'user_management_db',
  storeName: 'users',
});

// CREATE
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const newUser: User = {
    ...userData,
    id: Date.now().toString(), 
    createdAt: Date.now(),
  };
  await store.setItem(newUser.id, newUser);
  return newUser;
};

// READ ALL
export const getUsers = async (): Promise<User[]> => {
  const users: User[] = [];
  await store.iterate<User, any>((value) => {
    users.push(value);
  });
  // Saralash: Eng yangi foydalanuvchilar yuqorida
  return users.sort((a, b) => b.createdAt - a.createdAt); 
};

// UPDATE
export const updateUser = async (user: User): Promise<User> => {
  await store.setItem(user.id, user);
  return user;
};

// DELETE
export const deleteUser = async (id: string): Promise<void> => {
  await store.removeItem(id);
};