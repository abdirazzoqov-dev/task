// src/pages/UsersPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useUserStore } from '../data-config/userStore'; // YO'L TUZATILDI
import type { User } from '../types/User';
import { UserFormModal } from '../components/custom/UserFormModal';
import { DeleteConfirmationModal } from '../components/custom/DeleteConfirmationModal'; 

export const UsersPage: React.FC = () => {
  const { users, fetchUsers, isLoading, error } = useUserStore();
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // CRUD Handlerlari
  const handleCreate = () => { setEditingUser(undefined); setIsFormModalOpen(true); };
  const handleEdit = (user: User) => { setEditingUser(user); setIsFormModalOpen(true); };
  const handleDeleteClick = (id: string) => { setDeletingUserId(id); setIsDeleteModalOpen(true); };

  const filteredUsers = useMemo(() => {
    // ... qidiruv mantiqi
    if (!searchTerm) return users;
    const lowerCaseSearch = searchTerm.toLowerCase();
    return users.filter(user => 
      user.firstName.toLowerCase().includes(lowerCaseSearch) ||
      user.lastName.toLowerCase().includes(lowerCaseSearch)
    );
  }, [users, searchTerm]);
  
  if (isLoading && users.length === 0) return <div className="p-8 text-center text-lg">Yuklanmoqda...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Xatolik: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Foydalanuvchilarni Boshqarish</h1>
      {/* Search va Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <input type="text" placeholder="Qidirish..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-80 focus:ring-2 focus:ring-indigo-500"/>
        <button onClick={handleCreate} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors w-full sm:w-auto">
          ➕ Yangi Foydalanuvchi
        </button>
      </div>

      {/* Desktop Jadvali */}
      <div className="hidden md:block bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... Table Header ... */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ism</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Familiya</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tug'ilgan kun</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jinsi</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.birthdate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900">Tahrirlash</button>
                  <button onClick={() => handleDeleteClick(user.id)} className="text-red-600 hover:text-red-900 ml-2">O'chirish</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <p className="font-bold text-lg">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-600">Tug'ilgan kun: {user.birthdate}</p>
            <p className="text-sm text-gray-600">Jinsi: {user.gender}</p>
            <div className="mt-3 flex space-x-3">
              <button onClick={() => handleEdit(user)} className="text-sm text-indigo-600 hover:text-indigo-900">Tahrirlash</button>
              <button onClick={() => handleDeleteClick(user.id)} className="text-sm text-red-600 hover:text-red-900">O'chirish</button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modallar */}
      <UserFormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} initialData={editingUser} />
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} userId={deletingUserId} />

      {isLoading && users.length > 0 && (<div className="text-center mt-4 text-indigo-600">Yangilanmoqda...</div>)}
    </div>
  );
};