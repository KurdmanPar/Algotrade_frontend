// components/layout/Topbar.tsx
import React from 'react';

export const Topbar: React.FC = () => {
  return (
    <header className="h-16 bg-card border-b border-border shadow-sm z-50 flex items-center px-6">
      <div className="text-xl font-semibold text-foreground">Topbar</div>
    </header>
  );
};