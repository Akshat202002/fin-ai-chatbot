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
    console.log(`OnboardingScreen: handleNext called with key=${key}, value=${value}, currentStep=${step}`);
    
    const updatedProfile = {
      ...userProfile,
      [key]: value
    };
    
    console.log('OnboardingScreen: Updated profile:', updatedProfile);
    await setUserProfile(updatedProfile);
    
    // Handle goal selection logic
    if (key === 'goal') {
      console.log(`OnboardingScreen: Goal selected: ${value}`);
      if (value.toLowerCase() === 'insurance') {
        console.log('OnboardingScreen: Moving to insurance type selection (step 7)');
        setStep(7);
        return;
      } else {
        console.log('OnboardingScreen: Non-insurance goal selected, completing onboarding');
        return;
      }
    }
    
    // Handle insurance type selection (final step)
    if (key === 'insuranceType') {
      console.log(`OnboardingScreen: Insurance type selected: ${value}, completing onboarding`);
      return;
    }
    
    // Normal flow - go to next step
    const nextStep = step + 1;
    console.log(`OnboardingScreen: Moving to next step: ${nextStep}`);
    setStep(nextStep);
  };

  const renderStep = () => {
    console.log(`OnboardingScreen: Rendering step ${step}`);
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
        return <InsuranceTypeSelection onNext={handleNext} />;
      default:
        console.log(`OnboardingScreen: Unknown step ${step}`);
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