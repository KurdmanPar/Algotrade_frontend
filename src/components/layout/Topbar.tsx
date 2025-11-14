// src/components/layout/Topbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  Bell,
  Search,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  Circle,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- کامپوننت‌های داخلی برای خوانایی بیشتر ---

const GlobalSearch = () => (
  <div className="relative max-w-md">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
    <Input
      type="search"
      placeholder="Search strategies, symbols, trades..."
      className="pl-10 bg-muted/50 border-border"
    />
  </div>
);

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'Connected' | 'Disconnected' | 'Connecting'>('Connected');
  const statusColor = status === 'Connected' ? 'text-green-500' : status === 'Disconnected' ? 'text-red-500' : 'text-yellow-500';

  // شبیه‌سازی تغییر وضعیت
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => prev === 'Connected' ? 'Disconnected' : 'Connected');
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Circle className={`${statusColor} fill-current`} size={10} />
      <span className="text-muted-foreground">{status}</span>
    </div>
  );
};

const NotificationDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-80 p-2 shadow-lg rounded-md border border-border bg-popover text-popover-foreground">
      <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">Notifications</DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-border my-1" />
      <div className="max-h-96 overflow-y-auto">
        <DropdownMenuItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <div>
            <p className="font-medium">Strategy 'MA Cross' completed</p>
            <p className="text-sm text-muted-foreground">Backtest finished with 15% profit.</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <div>
            <p className="font-medium">New signal for BTC/USDT</p>
            <p className="text-sm text-muted-foreground">Strong BUY signal detected.</p>
          </div>
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // برای جلوگیری از ناهماهنگی سمت سرور و کلاینت

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="flex items-center space-x-2 h-10 px-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>PN</AvatarFallback>
        </Avatar>
        <span className="hidden md:block text-sm font-medium">Parham N</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 p-2 shadow-lg rounded-md border border-border bg-popover text-popover-foreground">
      <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">My Account</DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-border my-1" />
      <DropdownMenuItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator className="bg-border my-1" />
      <DropdownMenuItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);


// --- کامپوننت اصلی Topbar ---

export const Topbar: React.FC = () => {
  const pathname = usePathname();

  // تابع ساده برای ساخت breadcrumbs
  const getBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    return pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const title = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { href, title };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 bg-card border-b border-border shadow-sm z-50 flex items-center justify-between px-6">
      {/* بخش چپ: Breadcrumbs */}
      <div className="flex items-center space-x-4">
        {breadcrumbs.length > 0 ? (
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a href="/dashboard" className="hover:text-foreground">Home</a>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <span>/</span>
                <a href={crumb.href} className="hover:text-foreground capitalize">
                  {crumb.title}
                </a>
              </React.Fragment>
            ))}
          </nav>
        ) : (
          <div className="text-xl font-semibold text-foreground">AlgoTrade</div>
        )}
      </div>

      {/* بخش وسط: جستجو */}
      <GlobalSearch />

      {/* بخش راست: ابزارها */}
      <div className="flex items-center space-x-4">
        <ConnectionStatus />
        <NotificationDropdown />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
};