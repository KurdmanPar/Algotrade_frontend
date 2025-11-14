// src/components/providers/query-client-provider.tsx
"use client"; // <-- این خط بسیار مهم است!

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface QueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProviderWrapper = ({ children }: QueryClientProviderProps) => {
  // ایجاد یک نمونه جدید از QueryClient برای هر نمونه از کامپوننت
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};