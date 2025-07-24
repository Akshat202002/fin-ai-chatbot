import React from 'react';
import { VStack, Heading, Button, Text } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const AgeSelection = ({ onNext }: Props) => {
  const ageGroups = ['18-24', '25-34', '35-44', '45+'];

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">What is your age?</Heading>
      <Text textAlign="center">
        We will personalise FinCue based on your answers
      </Text>
      <VStack space={4} w="100%">
        {ageGroups.map((age) => (
          <Button
            key={age}
            size="lg"
            variant="outline"
            onPress={() => onNext('age', age)}
          >
            {age}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default AgeSelection;