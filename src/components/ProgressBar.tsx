import { useTheme } from '../hooks/useTheme';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const { isDark } = useTheme();
  // Calculate completion percentage based on steps
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          Step {currentStep} of {totalSteps}
        </span>
        <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          {Math.round(percentage)}% Complete
        </span>
      </div>
      <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
