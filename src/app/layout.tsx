// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryClientProviderWrapper } from '@/components/providers/query-client-provider'; // <-- از مسیر جدید وارد شد
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AlgoTrade Platform',
  description: 'Professional Algorithmic Trading System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProviderWrapper> {/* <-- استفاده از کامپوننت جدید */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MainLayout>{children}</MainLayout>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}