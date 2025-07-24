import React, { useState } from 'react';
import { Box, Center, VStack, Heading, Text } from 'native-base';
import LanguageSelection from './LanguageSelection';
import AgeSelection from './AgeSelection';
import EmploymentStatus from './EmploymentStatus';
import LocationSelection from './LocationSelection';

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    language: '',
    age: '',
    employment: '',
    location: ''
  });

  const handleNext = (key: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [key]: value }));
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
      <Center flex={1} px={4}>
        {renderStep()}
      </Center>
    </Box>
  );
};

export default OnboardingScreen;