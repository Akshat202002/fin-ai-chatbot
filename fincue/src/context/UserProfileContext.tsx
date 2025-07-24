import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, initialUserProfile } from '../types/userProfile';

interface UserProfileContextType {
  userProfile: UserProfile;
  updateProfile: (key: keyof UserProfile, value: string) => Promise<void>;
  resetProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };
  const updateProfile = async (key: keyof UserProfile, value: string) => {
    try {
      const updatedProfile = { ...userProfile, [key]: value };
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
      // AsyncStorage.getItem returns a Promise, need to await it for correct logging
      const savedProfile = await AsyncStorage.getItem('userProfile');
      console.log("Profile", savedProfile);
      
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const resetProfile = async () => {
    try {
      await AsyncStorage.removeItem('userProfile');
      setUserProfile(initialUserProfile);
    } catch (error) {
      console.error('Error resetting profile:', error);
    }
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateProfile, resetProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (undefined === context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};