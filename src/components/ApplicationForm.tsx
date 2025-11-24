import { useState } from 'react';
import { useApplicationForm } from '../hooks/useApplicationForm';
import { useTheme } from '../hooks/useTheme';
import { ProgressBar } from './ProgressBar';
import { PersonalInfoStep } from './PersonalInfoStep';
import { AcademicInfoStep } from './AcademicInfoStep';
import { DocumentUploadStep } from './DocumentUploadStep';
import { ReviewStep } from './ReviewStep';
import { FaCheckCircle } from 'react-icons/fa';

export function ApplicationForm() {
  const { isDark } = useTheme();
  const {
    formData,
    currentStep,
    totalSteps,
    errors,
    nextStep,
    previousStep,
    updatePersonalInfo,
    updateAcademicInfo,
    updateDocuments,
    submitApplication,
  } = useApplicationForm();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    nextStep();
  };

  const handleBack = () => {
    previousStep();
  };
  
  // Handle form submission

  const handleSubmit = () => {
    // Final validation before submission
    if (submitApplication()) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <FaCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Application Submitted Successfully!</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Thank you for submitting your application. We have received all your documents and information.
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            You will receive a confirmation email shortly with further instructions.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              window.location.reload();
            }}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
        {currentStep === 1 && (
          <PersonalInfoStep
            data={formData.personal}
            errors={errors}
            onChange={updatePersonalInfo}
          />
        )}

        {currentStep === 2 && (
          <AcademicInfoStep
            data={formData.academic}
            errors={errors}
            onChange={updateAcademicInfo}
          />
        )}

        {currentStep === 3 && (
          <DocumentUploadStep
            data={formData.documents}
            errors={errors}
            onChange={updateDocuments}
          />
        )}

        {currentStep === 4 && <ReviewStep data={formData} />}

        <div className={`flex justify-between mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
