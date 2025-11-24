import { useState } from 'react';

export interface UploadedFile {
  file: File;
  name: string;
  size: string;
}

export function useFileUpload() {
  const [uploadError, setUploadError] = useState<string>('');

  // Validate PDF file type and size
  const validatePDF = (file: File): boolean => {
    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files are allowed');
      return false;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size must be less than 10MB');
      return false;
    }

    setUploadError('');
    return true;
  };

  const handleFileSelect = (file: File | null): UploadedFile | null => {
    if (!file) {
      setUploadError('');
      return null;
    }

    if (!validatePDF(file)) {
      return null;
    }

    const sizeInKB = (file.size / 1024).toFixed(2);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const displaySize = file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;

    return {
      file,
      name: file.name,
      size: displaySize,
    };
  };

  const clearError = () => {
    setUploadError('');
  };

  return {
    uploadError,
    handleFileSelect,
    clearError,
  };
}
