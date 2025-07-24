import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, initialUserProfile } from '../types/userProfile';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  module?: string;
}

interface UserContextType {
  userProfile: UserProfile | null;
  chatHistory: ChatMessage[];
  currentModule: string;
  isOnboarded: boolean;
  setUserProfile: (profile: UserProfile) => Promise<void>;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setCurrentModule: (module: string) => void;
  completeOnboarding: () => void;
  clearChatHistory: () => void;
  resetProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(initialUserProfile);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentModule, setCurrentModule] = useState<string>('general');
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<number>(0);

  // Load user data on app start
  useEffect(() => {
    loadUserData();
  }, [resetKey]);

  // Watch for profile changes to update onboarded status
  useEffect(() => {
    console.log('Profile changed:', userProfile);
    if (userProfile) {
      // Check if basic profile is complete
      const basicComplete = userProfile.language && 
                           userProfile.gender && 
                           userProfile.age && 
                           userProfile.employment && 
                           userProfile.goal;

      // If basic profile is complete, check for special cases
      if (basicComplete) {
        // If goal is insurance, also check for insurance type
        if (userProfile.goal === 'insurance') {
          const insuranceComplete = userProfile.insuranceType && userProfile.insuranceType !== '';
          console.log('Insurance goal detected, insurance type complete?', insuranceComplete);
          setIsOnboarded(insuranceComplete);
        } else {
          // For non-insurance goals, basic profile completion is enough
          console.log('Non-insurance goal, profile complete');
          setIsOnboarded(true);
        }
      } else {
        console.log('Basic profile not complete');
        setIsOnboarded(false);
      }
    } else {
      console.log('No profile, setting onboarded to false');
      setIsOnboarded(false);
    }
  }, [userProfile, resetKey]);

  const loadUserData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('userProfile');
      const chatData = await AsyncStorage.getItem('chatHistory');

      if (profileData) {
        const profile = JSON.parse(profileData);
        setUserProfileState(profile);
      } else {
        setUserProfileState(initialUserProfile);
      }
      
      if (chatData) {
        const parsedChat = JSON.parse(chatData);
        const chatWithDates = parsedChat.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setChatHistory(chatWithDates);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserProfileState(initialUserProfile);
    }
  };

  const setUserProfile = async (profile: UserProfile): Promise<void> => {
    try {
      console.log('Setting profile:', profile);
      setUserProfileState(profile);
      
      // Check if profile is being reset (all empty values)
      const isEmpty = !profile.language && !profile.gender && !profile.age && 
                     !profile.employment && !profile.goal;
      
      if (isEmpty) {
        console.log('Profile is empty, removing from storage');
        await AsyncStorage.removeItem('userProfile');
        await AsyncStorage.removeItem('isOnboarded');
        setIsOnboarded(false);
      } else {
        console.log('Profile has data, saving to storage');
        await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
        
        // Don't auto-set isOnboarded here - let the useEffect handle it
        // based on the complete profile logic including insurance type
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const resetProfile = async (): Promise<void> => {
    try {
      console.log('Resetting profile...');
      await AsyncStorage.removeItem('userProfile');
      await AsyncStorage.removeItem('isOnboarded');
      await AsyncStorage.removeItem('chatHistory');
      
      setUserProfileState(initialUserProfile);
      setChatHistory([]);
      setIsOnboarded(false);
      setResetKey(prev => prev + 1);
      
      console.log('Profile reset complete');
    } catch (error) {
      console.error('Error resetting profile:', error);
    }
  };

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
      module: currentModule,
    };

    setChatHistory(prev => {
      const updated = [...prev, newMessage];
      AsyncStorage.setItem('chatHistory', JSON.stringify(updated)).catch(console.error);
      return updated;
    });
  };

  const completeOnboarding = async () => {
    try {
      setIsOnboarded(true);
      await AsyncStorage.setItem('isOnboarded', JSON.stringify(true));
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const clearChatHistory = async () => {
    try {
      setChatHistory([]);
      await AsyncStorage.removeItem('chatHistory');
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  return (
    <UserContext.Provider
      key={resetKey}
      value={{
        userProfile,
        chatHistory,
        currentModule,
        isOnboarded,
        setUserProfile,
        addMessage,
        setCurrentModule,
        completeOnboarding,
        clearChatHistory,
        resetProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};