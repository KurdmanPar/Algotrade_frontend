// src/utils/apiClient.ts
import axios from 'axios';

// آدرس سرور بک‌اند Django شما
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// در آینده، می‌توانیم اینجا اینترسپتور (interceptor) برای اضافه کردن توکن JWT اضافه کنیم