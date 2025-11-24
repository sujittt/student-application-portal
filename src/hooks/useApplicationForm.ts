import { useState } from 'react';
import { ApplicationFormData, PersonalInfo, AcademicInfo, DocumentInfo } from '../types';
import { useLocalStorage } from './useLocalStorage';

// Custom hook to manage multi-step application form

const initialPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

const initialAcademicInfo: AcademicInfo = {
  class10School: '',
  class10Percentage: '',
  class12School: '',
  class12Percentage: '',
  major: '',
  achievements: '',
};

const initialDocumentInfo: DocumentInfo = {
  class10Marksheet: null,
  class12Marksheet: null,
};

const initialFormData: ApplicationFormData = {
  personal: initialPersonalInfo,
  academic: initialAcademicInfo,
  documents: initialDocumentInfo,
};

export function useApplicationForm() {
  const [formData, setFormData] = useLocalStorage<ApplicationFormData>('applicationDraft', initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const validatePersonalInfo = (data: PersonalInfo): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!data.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!data.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!data.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!data.address.trim()) newErrors.address = 'Address is required';
    if (!data.city.trim()) newErrors.city = 'City is required';
    if (!data.state.trim()) newErrors.state = 'State is required';
    if (!data.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    return newErrors;
  };

  const validateAcademicInfo = (data: AcademicInfo): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!data.class10School.trim()) newErrors.class10School = 'Class 10th school name is required';
    
    if (!data.class10Percentage.trim()) {
      newErrors.class10Percentage = 'Class 10th percentage is required';
    } else if (isNaN(Number(data.class10Percentage)) || Number(data.class10Percentage) < 0 || Number(data.class10Percentage) > 100) {
      newErrors.class10Percentage = 'Percentage must be between 0 and 100';
    }
    
    if (!data.class12School.trim()) newErrors.class12School = 'Class 12th school name is required';
    
    if (!data.class12Percentage.trim()) {
      newErrors.class12Percentage = 'Class 12th percentage is required';
    } else if (isNaN(Number(data.class12Percentage)) || Number(data.class12Percentage) < 0 || Number(data.class12Percentage) > 100) {
      newErrors.class12Percentage = 'Percentage must be between 0 and 100';
    }
    
    if (!data.major.trim()) newErrors.major = 'Intended major/course is required';

    return newErrors;
  };

  const validateDocuments = (data: DocumentInfo): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!data.class10Marksheet) newErrors.class10Marksheet = 'Class 10th marksheet is required';
    if (!data.class12Marksheet) newErrors.class12Marksheet = 'Class 12th marksheet is required';

    return newErrors;
  };

  const validateCurrentStep = (): boolean => {
    let stepErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        stepErrors = validatePersonalInfo(formData.personal);
        break;
      case 2:
        stepErrors = validateAcademicInfo(formData.academic);
        break;
      case 3:
        stepErrors = validateDocuments(formData.documents);
        break;
      default:
        stepErrors = {};
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrors({}); // Clear errors when moving to next step
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const updatePersonalInfo = (updates: Partial<PersonalInfo>) => {
    setFormData({
      ...formData,
      personal: { ...formData.personal, ...updates },
    });
  };

  const updateAcademicInfo = (updates: Partial<AcademicInfo>) => {
    setFormData({
      ...formData,
      academic: { ...formData.academic, ...updates },
    });
  };

  const updateDocuments = (updates: Partial<DocumentInfo>) => {
    setFormData({
      ...formData,
      documents: { ...formData.documents, ...updates },
    });
  };

  const calculateCompleteness = (): number => {
    const personalFields = Object.values(formData.personal).filter(v => v && v.toString().trim());
    const academicFields = Object.values(formData.academic).filter(v => v && v.toString().trim());
    const documentFields = Object.values(formData.documents).filter(v => v !== null);

    // 9 personal fields + 6 academic fields + 2 documents = 17 total
    const totalRequired = 9 + 4 + 3;
    const completed = personalFields.length + academicFields.length + documentFields.length;

    return Math.round((completed / totalRequired) * 100);
  };

  const submitApplication = () => {
    if (validateCurrentStep()) {
      // TODO: Send data to backend API
      console.log('Application submitted:', formData);
      // Clear localStorage after successful submission
      localStorage.removeItem('applicationDraft');
      return true;
    }
    return false;
  };

  const clearDraft = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrors({});
  };

  return {
    formData,
    currentStep,
    totalSteps,
    errors,
    nextStep,
    previousStep,
    updatePersonalInfo,
    updateAcademicInfo,
    updateDocuments,
    calculateCompleteness,
    submitApplication,
    clearDraft,
  };
}
