import React from 'react';
import { VStack, Heading, Button } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const SpeciallyAbledSelection = ({ onNext }: Props) => {
  const options = ['Yes', 'No'];

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">Specially abled?</Heading>
      <VStack space={4} w="100%">
        {options.map((option) => (
          <Button
            key={option}
            size="lg"
            variant="outline"
            onPress={() => onNext('speciallyAbled', option.toLowerCase())}
          >
            {option}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default SpeciallyAbledSelection;