import { useTheme } from '../hooks/useTheme';

interface CompletenessIndicatorProps {
  percentage: number;
}

export function CompletenessIndicator({ percentage }: CompletenessIndicatorProps) {
  const { isDark } = useTheme();
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate SVG stroke offset for circular progress
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg shadow-sm border ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="relative">
        <svg className="transform -rotate-90" width="88" height="88">
          <circle
            cx="44"
            cy="44"
            r={radius}
            stroke={isDark ? '#374151' : '#e5e7eb'}
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="44"
            cy="44"
            r={radius}
            stroke="#2563eb"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{percentage}%</span>
        </div>
      </div>
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile Completeness</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {percentage === 100 ? 'All required fields completed!' : 'Fill in all required fields to complete your profile'}
        </p>
      </div>
    </div>
  );
}
