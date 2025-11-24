import { AcademicInfo } from '../types';
import { useTheme } from '../hooks/useTheme';

interface AcademicInfoStepProps {
  data: AcademicInfo;
  errors: Record<string, string>;
  onChange: (updates: Partial<AcademicInfo>) => void;
}

export function AcademicInfoStep({ data, errors, onChange }: AcademicInfoStepProps) {
  const { isDark } = useTheme();
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Academic Information</h2>

      <div className={`${isDark ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}>
        <h3 className={`font-semibold ${isDark ? 'text-blue-200' : 'text-blue-900'} mb-2`}>Class 10th Details</h3>
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Class 10th School Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.class10School}
          onChange={(e) => onChange({ class10School: e.target.value })}
          placeholder="Enter your Class 10th school name"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.class10School ? 'border-red-500' : isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
        {errors.class10School && <p className="mt-1 text-sm text-red-500">{errors.class10School}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Class 10th Percentage <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.class10Percentage}
          onChange={(e) => onChange({ class10Percentage: e.target.value })}
          placeholder="e.g., 85.5"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.class10Percentage ? 'border-red-500' : isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
        {errors.class10Percentage && <p className="mt-1 text-sm text-red-500">{errors.class10Percentage}</p>}
      </div>

      <div className={`${isDark ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4 mt-6`}>
        <h3 className={`font-semibold ${isDark ? 'text-blue-200' : 'text-blue-900'} mb-2`}>Class 12th Details</h3>
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Class 12th School Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.class12School}
          onChange={(e) => onChange({ class12School: e.target.value })}
          placeholder="Enter your Class 12th school name"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.class12School ? 'border-red-500' : isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
        {errors.class12School && <p className="mt-1 text-sm text-red-500">{errors.class12School}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Class 12th Percentage <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.class12Percentage}
          onChange={(e) => onChange({ class12Percentage: e.target.value })}
          placeholder="e.g., 90.5"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.class12Percentage ? 'border-red-500' : isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
        {errors.class12Percentage && <p className="mt-1 text-sm text-red-500">{errors.class12Percentage}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Intended Major/Course <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.major}
          onChange={(e) => onChange({ major: e.target.value })}
          placeholder="e.g., B.Tech Computer Science, B.Com, B.Sc Mathematics"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.major ? 'border-red-500' : isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
        {errors.major && <p className="mt-1 text-sm text-red-500">{errors.major}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Achievements & Extracurricular Activities (Optional)
        </label>
        <textarea
          value={data.achievements}
          onChange={(e) => onChange({ achievements: e.target.value })}
          rows={5}
          placeholder="Describe your achievements, awards, clubs, sports, volunteer work, competitions, etc."
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
      </div>
    </div>
  );
}
