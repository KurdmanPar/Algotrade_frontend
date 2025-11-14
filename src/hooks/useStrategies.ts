// src/hooks/useStrategies.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils/apiClient';

// تعریف تایپ برای یک استراتژی (این را باید دقیقاً مطابق با مدل Django خودتان کنید)
interface Strategy {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

// هوک سفارشی برای دریافت لیست استراتژی‌ها
export const useStrategies = () => {
  return useQuery<Strategy[]>({
    // کلید منحصر به فرد برای کش کردن این کوئری
    queryKey: ['strategies'],

    // تابعی که داده‌ها را دریافت می‌کند
    queryFn: async () => {
      const response = await apiClient.get('/strategies/');
      return response.data;
    },

    // تنظیمات اختیاری برای بهبود عملکرد
    staleTime: 5 * 60 * 1000, // داده‌ها به مدت ۵ دقیقه تازه محسوب می‌شوند
    refetchOnWindowFocus: false, // با فوکوس کردن پنجره، دوباره درخواست ارسال نمی‌شود
  });
};