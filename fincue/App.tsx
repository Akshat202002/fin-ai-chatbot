// App.js or App.tsx
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import OnboardingScreen from './src/components/onboarding/OnboardingScreen';

export default function App() {
  return (
    <NativeBaseProvider>
      <OnboardingScreen />
    </NativeBaseProvider>
  );
}
