import { useTheme } from '../hooks/useTheme';

export function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`${isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-600'} border-t mt-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm">
          © 2024 College Application Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
