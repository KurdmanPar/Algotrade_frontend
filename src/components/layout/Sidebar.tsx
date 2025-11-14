"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Activity,
  Database,
  Brain,
  FileText,
  Settings,
} from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: { title: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    href: '/dashboard',
  },
  {
    title: 'Strategies',
    icon: <TrendingUp size={20} />,
    subItems: [
      { title: 'My Strategies', href: '/strategies' },
      { title: 'Create New', href: '/strategies/new' },
      { title: 'Strategy Library', href: '/strategies/library' },
    ],
  },
  // ... (بقیه منوها را می‌توانید اضافه کنید)
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>('Strategies');

  const toggleMenu = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <aside className="w-64 bg-card text-card-foreground border-r border-border">
      <div className="p-6">
        <h2 className="text-2xl font-bold">AlgoTrade</h2>
      </div>
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-md transition-colors ${
                      openMenu === item.title
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    {openMenu === item.title ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  {openMenu === item.title && item.subItems && (
                    <ul className="mt-2 space-y-1 pl-10">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            className={`block px-4 py-1 rounded-md text-sm transition-colors ${
                              pathname === subItem.href
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-accent hover:text-accent-foreground'
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};