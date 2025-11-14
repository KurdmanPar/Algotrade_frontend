import React from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};