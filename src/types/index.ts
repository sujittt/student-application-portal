export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface AcademicInfo {
  class10School: string;
  class10Percentage: string;
  class12School: string;
  class12Percentage: string;
  major: string;
  achievements: string;
}

export interface DocumentInfo {
  class10Marksheet: File | null;
  class12Marksheet: File | null;
}

export interface ApplicationFormData {
  personal: PersonalInfo;
  academic: AcademicInfo;
  documents: DocumentInfo;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface VideoProgress {
  currentTime: number;
  duration: number;
  watchedPercentage: number;
}
