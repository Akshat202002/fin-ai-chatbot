import React from 'react';
import { VStack, Heading, Button } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const InsuranceTypeSelection = ({ onNext }: Props) => {
  const types = ['Term Insurance', 'Life Insurance'];

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">Select Insurance Type</Heading>
      <VStack space={4} w="100%">
        {types.map((type) => (
          <Button
            key={type}
            size="lg"
            variant="outline"
            onPress={() => onNext('insuranceType', type.toLowerCase())}
          >
            {type}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default InsuranceTypeSelection;