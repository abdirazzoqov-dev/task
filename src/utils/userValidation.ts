// src/utils/userValidation.ts
import { z } from 'zod';

export const UserFormSchema = z.object({
  firstName: z.string().min(2, "Ism kamida 2ta belgidan iborat bo'lishi kerak.").max(50),
  lastName: z.string().min(2, "Familiya kamida 2ta belgidan iborat bo'lishi kerak.").max(50),
  
  birthdate: z.string().refine((date) => {
    const d = new Date(date);
    // Sananing haqiqiy va kelajakda emasligini tekshirish
    return !isNaN(d.getTime()) && d < new Date(); 
  }, "Noto'g'ri yoki kelajakdagi sana kiritildi."),
  
  gender: z.enum(['Male', 'Female', 'Other'], {
    errorMap: () => ({ message: "Jinsni tanlash majburiy." }),
  }),
});

export type UserFormInput = z.infer<typeof UserFormSchema>;