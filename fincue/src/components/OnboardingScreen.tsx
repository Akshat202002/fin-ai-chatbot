import React, { useState } from 'react';
import { Box } from 'native-base';
import { useUserProfile } from '../context/UserProfileContext';
import LanguageSelection from './onboarding/LanguageSelection';
import AgeSelection from './onboarding/AgeSelection';
import EmploymentStatus from './onboarding/EmploymentStatus';
import LocationSelection from './onboarding/LocationSelection';

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);
  const { updateProfile } = useUserProfile();

  const handleNext = async (key: string, value: string) => {
    await updateProfile(key as any, value);
    setStep(prev => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <LanguageSelection onNext={handleNext} />;
      case 1:
        return <AgeSelection onNext={handleNext} />;
      case 2:
        return <EmploymentStatus onNext={handleNext} />;
      case 3:
        return <LocationSelection onNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <Box flex={1} bg="white" safeArea>
      {renderStep()}
    </Box>
  );
};

export default OnboardingScreen;