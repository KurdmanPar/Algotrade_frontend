// src/app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">
        Welcome to the Dashboard
      </h1>
      <p className="mt-4 text-muted-foreground">
        This is the main content area. Key metrics and charts will be displayed here.
      </p>
    </div>
  );
}