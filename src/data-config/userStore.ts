// src/data-config/userStore.ts
import { create } from 'zustand';
import type { User } from '../types/User';
import * as userService from './userService';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (data: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  editUser: (user: User) => Promise<void>;
  removeUser: (id: string, reason: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await userService.getUsers();
      set({ users, isLoading: false });
    } catch (err) {
      set({ error: "Foydalanuvchilarni yuklashda xatolik yuz berdi.", isLoading: false });
    }
  },

  addUser: async (data) => {
    set({ isLoading: true });
    try {
      const newUser = await userService.createUser(data);
      set((state) => ({ users: [newUser, ...state.users], isLoading: false }));
    } catch (err) {
      set({ error: "Qo'shishda xatolik.", isLoading: false });
      throw new Error("Qo'shishda xatolik.");
    }
  },

  editUser: async (user) => {
    set({ isLoading: true });
    try {
      const updatedUser = await userService.updateUser(user);
      set((state) => ({
        users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: "Tahrirlashda xatolik.", isLoading: false });
      throw new Error("Tahrirlashda xatolik.");
    }
  },

  removeUser: async (id, reason) => {
    set({ isLoading: true });
    try {
      await userService.deleteUser(id);
      set((state) => ({ users: state.users.filter((u) => u.id !== id), isLoading: false }));
      console.log(`Foydalanuvchi o'chirildi. Sababi: ${reason}`); 
    } catch (err) {
      set({ error: "O'chirishda xatolik.", isLoading: false });
      throw new Error("O'chirishda xatolik.");
    }
  },
}));