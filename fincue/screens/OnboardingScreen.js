import React, { useState } from 'react';
import { VStack, Button, Text, Select, Box, Input, Heading, Center } from 'native-base';

const OnboardingScreen = () => {
  const [language, setLanguage] = useState('');
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');

  const handleStart = () => {
    console.log('User Data:', { name, language, profile });
    // Navigate to main chatbot screen or save to local state
  };

  return (
    <Center flex={1} px="4" bg="#f5f5f5">
      <Box safeArea p="5" w="100%" maxW="400" bg="white" rounded="lg" shadow="2">
        <Heading size="lg" mb="5">Welcome to FinCue</Heading>

        <VStack space={4}>
          <Input
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />

          <Select
            selectedValue={language}
            placeholder="Select Preferred Language"
            onValueChange={setLanguage}
          >
            <Select.Item label="English" value="en" />
            <Select.Item label="Hindi" value="hi" />
            <Select.Item label="Spanish" value="es" />
          </Select>

          <Select
            selectedValue={profile}
            placeholder="Select Your Profile"
            onValueChange={setProfile}
          >
            <Select.Item label="Student" value="student" />
            <Select.Item label="Urban Professional" value="urban" />
            <Select.Item label="Elderly" value="elderly" />
            <Select.Item label="Women Entrepreneur" value="women" />
            <Select.Item label="Gen Z" value="genz" />
            <Select.Item label="Minority Group" value="minority" />
          </Select>

          <Button onPress={handleStart} isDisabled={!name || !language || !profile}>
            Get Started
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default OnboardingScreen;
