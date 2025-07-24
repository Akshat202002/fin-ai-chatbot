import React, { useState } from 'react';
import { Box, Center } from 'native-base';
import { useUser } from '../../context/UserContext';
import LanguageSelection from './LanguageSelection';
import GenderSelection from './GenderSelection';
import SpeciallyAbledSelection from './SpeciallyAbledSelection';
import AgeSelection from './AgeSelection';
import EmploymentStatus from './EmploymentStatus';
import LocationSelection from './LocationSelection';
import GoalSelection from './GoalSelection';
import InsuranceTypeSelection from './InsuranceTypeSelection';

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);
  const { userProfile, setUserProfile } = useUser();

  const handleNext = async (key: string, value: string) => {
    const updatedProfile = {
      ...userProfile,
      [key]: value
    };
    
    setUserProfile(updatedProfile);
    
    if (key === 'goal' && value.toLowerCase() !== 'insurance') {
      // Skip insurance type selection if goal is not insurance
      setStep(prev => prev + 2);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <LanguageSelection onNext={handleNext} />;
      case 1:
        return <GenderSelection onNext={handleNext} />;
      case 2:
        return <SpeciallyAbledSelection onNext={handleNext} />;
      case 3:
        return <AgeSelection onNext={handleNext} />;
      case 4:
        return <EmploymentStatus onNext={handleNext} />;
      case 5:
        return <LocationSelection onNext={handleNext} />;
      case 6:
        return <GoalSelection onNext={handleNext} />;
      case 7:
        return userProfile?.goal === 'insurance' ? (
          <InsuranceTypeSelection onNext={handleNext} />
        ) : null;
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