import React from 'react';
import { VStack, Heading, Button } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const EmploymentStatus = ({ onNext }: Props) => {
  const statuses = ['Student', 'Self Employed', 'Salaried', 'Retired'];

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">I am</Heading>
      <VStack space={4} w="100%">
        {statuses.map((status) => (
          <Button
            key={status}
            size="lg"
            variant="outline"
            onPress={() => onNext('employment', status.toLowerCase())}
          >
            {status}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default EmploymentStatus;