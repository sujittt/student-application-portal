import { FaFileAlt, FaUpload, FaTimes } from 'react-icons/fa';
import { DocumentInfo } from '../types';
import { useFileUpload } from '../hooks/useFileUpload';
import { useTheme } from '../hooks/useTheme';

interface DocumentUploadStepProps {
  data: DocumentInfo;
  errors: Record<string, string>;
  onChange: (updates: Partial<DocumentInfo>) => void;
}

export function DocumentUploadStep({ data, errors, onChange }: DocumentUploadStepProps) {
  const { uploadError, handleFileSelect, clearError } = useFileUpload();
  const { isDark } = useTheme();

  const handleFileChange = (field: keyof DocumentInfo, file: File | null) => {
    clearError();
    const result = handleFileSelect(file);
    if (result) {
      onChange({ [field]: result.file });
    }
  };
  
  // Remove uploaded file

  const removeFile = (field: keyof DocumentInfo) => {
    onChange({ [field]: null });
  };

  const FileUploadBox = ({
    label,
    field,
    required = true,
  }: {
    label: string;
    field: keyof DocumentInfo;
    required?: boolean;
  }) => {
    const file = data[field];
    const error = errors[field];

    return (
      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {!file ? (
          <label
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              error
                ? 'border-red-300 bg-red-50 hover:bg-red-100'
                : isDark
                ? 'border-gray-600 bg-gray-700 hover:bg-gray-650'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FaUpload className={`w-8 h-8 mb-2 ${error ? 'text-red-400' : 'text-gray-400'}`} />
              <p className={`mb-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>PDF files only (max 10MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
            />
          </label>
        ) : (
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-lg`}>
            <div className="flex items-center gap-3">
              <FaFileAlt className="w-8 h-8 text-blue-600" />
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{file.name}</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeFile(field)}
              className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-blue-800' : 'hover:bg-blue-100'}`}
            >
              <FaTimes className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
        )}

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Document Upload</h2>

      {uploadError && (
        <div className={`p-4 ${isDark ? 'bg-red-900 border-red-800' : 'bg-red-50 border-red-200'} border rounded-lg`}>
          <p className={`text-sm ${isDark ? 'text-red-200' : 'text-red-700'}`}>{uploadError}</p>
        </div>
      )}

      <FileUploadBox label="Class 10th Marksheet" field="class10Marksheet" />
      <FileUploadBox label="Class 12th Marksheet" field="class12Marksheet" />

      <div className={`p-4 ${isDark ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-lg`}>
        <h3 className={`font-semibold ${isDark ? 'text-blue-200' : 'text-blue-900'} mb-2`}>Document Requirements:</h3>
        <ul className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'} space-y-1 list-disc list-inside`}>
          <li>All documents must be in PDF format</li>
          <li>Marksheets should be clear and readable</li>
          <li>Maximum file size: 10MB per document</li>
          <li>Ensure all pages are included in the scanned document</li>
          <li>School seal and signature should be visible on marksheets</li>
        </ul>
      </div>
    </div>
  );
}
