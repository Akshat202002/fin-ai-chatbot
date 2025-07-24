// App.js or App.tsx
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import OnboardingScreen from './screens/OnboardingScreen';

export default function App() {
  return (
    <NativeBaseProvider>
      <OnboardingScreen />
    </NativeBaseProvider>
  );
}
