import React from 'react';
import { NativeBaseProvider } from 'native-base';
// import './src/locales/i18n'; // Initialize i18n
import { UserProvider, useUser } from './src/context/UserContext';
import OnboardingScreen from './src/components/onboarding/OnboardingScreen';
import MainApp from './src/components/MainApp';

export default function App() {
  return (
    <NativeBaseProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </NativeBaseProvider>
  );
}

const AppNavigator = () => {
  const { isOnboarded } = useUser();
  
  return isOnboarded ? <MainApp /> : <OnboardingScreen />;
};