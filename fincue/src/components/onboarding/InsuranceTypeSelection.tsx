import React from 'react';
import { VStack, Heading, Button, Text } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const InsuranceTypeSelection = ({ onNext }: Props) => {
  const types = [
    { display: 'Term Life Insurance', value: 'term' },
    { display: 'Whole Life Insurance', value: 'life' }
  ];

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">Select Insurance Type</Heading>
      <Text textAlign="center" color="gray.600">
        Choose the type of life insurance that fits your needs
      </Text>
      <VStack space={4} w="100%">
        {types.map((type) => (
          <Button
            key={type.value}
            size="lg"
            variant="outline"
            onPress={() => onNext('insuranceType', type.value)}
          >
            {type.display}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default InsuranceTypeSelection;