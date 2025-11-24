import { ApplicationFormData } from '../types';
import { FaFileAlt } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

interface ReviewStepProps {
  data: ApplicationFormData;
}

export function ReviewStep({ data }: ReviewStepProps) {
  const { isDark } = useTheme();
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Review & Submit</h2>

      <div className={`${isDark ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}>
        <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
          Please review all information carefully before submitting your application.
        </p>
      </div>

      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Name</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>{data.personal.firstName} {data.personal.lastName}</p>
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>{data.personal.email}</p>
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>{data.personal.phone}</p>
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date of Birth</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>{data.personal.dateOfBirth}</p>
          </div>
          <div className="md:col-span-2">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Address</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>
              {data.personal.address}, {data.personal.city}, {data.personal.state} {data.personal.zipCode}
            </p>
          </div>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Academic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Class 10th School</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>{data.academic.class10School}</p>
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Class 10th Percentage</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>{data.academic.class10Percentage}%</p>
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Class 12th School</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>{data.academic.class12School}</p>
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Class 12th Percentage</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>{data.academic.class12Percentage}%</p>
          </div>
          <div className="md:col-span-2">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Intended Major/Course</p>
            <p className={`font-medium ${isDark ? 'text-white' : ''}`}>{data.academic.major}</p>
          </div>
          {data.academic.achievements && (
            <div className="md:col-span-2">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Achievements & Activities</p>
              <p className={`font-medium whitespace-pre-wrap ${isDark ? 'text-white' : ''}`}>{data.academic.achievements}</p>
            </div>
          )}
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Uploaded Documents</h3>
        <div className="space-y-3">
          {data.documents.class10Marksheet && (
            <div className={`flex items-center gap-3 p-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <FaFileAlt className="w-5 h-5 text-blue-600" />
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : ''}`}>Class 10th Marksheet</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{data.documents.class10Marksheet.name}</p>
              </div>
            </div>
          )}
          {data.documents.class12Marksheet && (
            <div className={`flex items-center gap-3 p-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <FaFileAlt className="w-5 h-5 text-blue-600" />
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : ''}`}>Class 12th Marksheet</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{data.documents.class12Marksheet.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
