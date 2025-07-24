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
  setUserProfile: (profile: UserProfile) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setCurrentModule: (module: string) => void;
  completeOnboarding: () => void;
  clearChatHistory: () => void;
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

  // Load user data on app start
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('userProfile');
      console.log("Profile Data", profileData);
      
      const chatData = await AsyncStorage.getItem('chatHistory');

      if (profileData) {
        const profile = JSON.parse(profileData);
        setUserProfileState(profile);
        
        // Check if profile is complete
        const isComplete = profile.language && 
                          profile.gender && 
                          profile.age && 
                          profile.employment && 
                          profile.goal;
        setIsOnboarded(isComplete);
      }
      
      if (chatData) {
        const parsedChat = JSON.parse(chatData);
        // Convert timestamp strings back to Date objects
        const chatWithDates = parsedChat.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setChatHistory(chatWithDates);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const setUserProfile = async (profile: UserProfile) => {
    try {
      setUserProfileState(profile);
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      
      // Auto-complete onboarding if profile has required fields
      const isComplete = profile.language && 
                        profile.gender && 
                        profile.age && 
                        profile.employment && 
                        profile.goal;
      
      if (isComplete) {
        setIsOnboarded(true);
        await AsyncStorage.setItem('isOnboarded', JSON.stringify(true));
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
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
      // Save to AsyncStorage
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};