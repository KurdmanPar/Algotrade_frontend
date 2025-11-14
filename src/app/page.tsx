// src/app/page.tsx
"use client"; // این کامپوننت از هوک‌ها استفاده می‌کند، پس باید کلاینت ساید باشد

import { useStrategies } from '@/hooks/useStrategies';

export default function HomePage() {
  const { data: strategies, isLoading, error } = useStrategies();

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Welcome to Dashboard
      </h1>

      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4">My Strategies</h2>

        {isLoading && <p className="text-muted-foreground">Loading strategies...</p>}

        {error && <p className="text-destructive">Failed to load strategies.</p>}

        {strategies && (
          <ul className="space-y-2">
            {strategies.map((strategy) => (
              <li key={strategy.id} className="p-3 bg-muted rounded-md">
                <span className="font-medium">{strategy.name}</span>
                <span className={`ml-2 text-sm ${strategy.is_active ? 'text-green-600' : 'text-red-600'}`}>
                  ({strategy.is_active ? 'Active' : 'Inactive'})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}