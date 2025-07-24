// App.js or App.tsx
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { UserProfileProvider } from './src/context/UserProfileContext';
import OnboardingScreen from './src/components/onboarding/OnboardingScreen';

export default function App() {
  return (
    <NativeBaseProvider>
      <UserProfileProvider>
        <OnboardingScreen />
      </UserProfileProvider>
    </NativeBaseProvider>
  );
}
