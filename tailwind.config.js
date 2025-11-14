/** @type {import('tailwindcss').Config} */
module.exports = {
  // The content path is still needed for v4
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // The theme.extend is now handled in globals.css with @theme
  // We can add plugins here if needed later
  plugins: [],
}