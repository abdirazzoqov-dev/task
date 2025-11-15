// src/components/custom/UserFormModal.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '../../types/User';
import { UserFormSchema, type UserFormInput } from '../../utils/userValidation';
import { useUserStore } from '../../data-config/userStore'; // YO'L TUZATILDI

// Qayta foydalaniladigan (reusable) Input, Button kabi komponentlar (Tailwind asosida)
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input: React.FC<any> = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      ref={ref}
      className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
));
Input.displayName = 'Input';


interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: User; 
}

export const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, initialData }) => {
  const { addUser, editUser, isLoading } = useUserStore();
  const isEdit = !!initialData;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormInput>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: initialData || { firstName: '', lastName: '', birthdate: '', gender: 'Male' },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(initialData || { firstName: '', lastName: '', birthdate: '', gender: 'Male' });
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = async (data: UserFormInput) => {
    try {
      if (isEdit) {
        await editUser({ ...initialData!, ...data });
      } else {
        await addUser(data);
      }
      onClose();
    } catch (e) {
      console.error(isEdit ? "Tahrirlashda xato:" : "Yaratishda xato:", e);
      // Xato store ichida ko'rsatilgan
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {isEdit ? 'Foydalanuvchini Tahrirlash' : 'Yangi Foydalanuvchi Qoʻshish'}
          </h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Ism" {...register("firstName")} error={errors.firstName?.message}/>
              <Input label="Familiya" {...register("lastName")} error={errors.lastName?.message}/>
            </div>
            {/* type="date" bilan brauzer kalendar pikerini ishlatadi */}
            <Input label="Tug'ilgan sana" type="date" {...register("birthdate")} error={errors.birthdate?.message}/>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Jinsi</label>
              <select
                {...register("gender")}
                className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="Male">Erkak</option>
                <option value="Female">Ayol</option>
                <option value="Other">Boshqa</option>
              </select>
              {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                Bekor qilish
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? 'Saqlanmoqda...' : (isEdit ? 'Saqlash' : 'Yaratish')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};