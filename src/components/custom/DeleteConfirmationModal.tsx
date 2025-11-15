// src/components/custom/DeleteConfirmationModal.tsx
import React, { useState } from 'react';
import { useUserStore } from '../../data-config/userStore'; // YO'L TUZATILDI

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, userId }) => {
  const [reason, setReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  // useUserStore'dan faqat kerakli funksiyani olish
  const removeUser = useUserStore((state) => state.removeUser); 

  const handleDelete = async () => {
    if (!userId || !reason.trim()) return;
    
    setIsDeleting(true);
    try {
      await removeUser(userId, reason);
    } catch (error) {
      alert("Foydalanuvchini o'chirishda xatolik yuz berdi.");
    } finally {
      setIsDeleting(false);
      setReason('');
      onClose(); // Xato bo'lsa ham modalni yopish
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ Foydalanuvchini O'chirish</h3>
        <p className="text-gray-700 mb-4">O'chirish sababini kiriting:</p>
        
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="O'chirish sababi (Majburiy)"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />

        <div className="flex justify-end space-x-3 pt-6">
          <button 
            type="button" 
            onClick={() => { setReason(''); onClose(); }}
            className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Bekor qilish
          </button>
          <button 
            onClick={handleDelete} 
            disabled={isDeleting || reason.trim().length === 0} 
            className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? 'Oʻchirilmoqda...' : 'Oʻchirishni Tasdiqlash'}
          </button>
        </div>
      </div>
    </div>
  );
};