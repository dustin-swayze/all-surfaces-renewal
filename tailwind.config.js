/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep blue primary with a warm amber accent.
        // Adjust freely once the business owner shares final brand preferences.
        brand: {
          DEFAULT: '#1e3a5f', // deep blue
          dark: '#152a47',
          light: '#2f5785',
        },
        accent: {
          DEFAULT: '#d97706', // amber-600 — warm, trustworthy
          dark: '#b45309',
          light: '#f59e0b',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f7f8fa',
          border: '#e5e7eb',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
        hover: '0 10px 30px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
    },
  },
  plugins: [],
};
