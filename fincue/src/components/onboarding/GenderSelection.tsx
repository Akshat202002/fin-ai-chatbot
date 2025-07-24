import React from 'react';
import { VStack, Heading, Button } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const GenderSelection = ({ onNext }: Props) => {
  const genders = ['Male', 'Female', 'Others', 'Prefer Not to Say'];

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">Gender</Heading>
      <VStack space={4} w="100%">
        {genders.map((gender) => (
          <Button
            key={gender}
            size="lg"
            variant="outline"
            onPress={() => onNext('gender', gender.toLowerCase())}
          >
            {gender}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default GenderSelection;