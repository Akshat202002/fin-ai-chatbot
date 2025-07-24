export interface UserProfile {
  language: string;
  gender: string;
  speciallyAbled: string;
  age: string;
  employment: string;
  location: string;
  goal: string;
  insuranceType: string;
}

export const initialUserProfile: UserProfile = {
  language: '',
  gender: '',
  speciallyAbled: '',
  age: '',
  employment: '',
  location: '',
  goal: '',
  insuranceType: ''
};