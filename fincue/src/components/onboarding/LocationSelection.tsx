import React from 'react';
import { VStack, Heading, Button } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const LocationSelection = ({ onNext }: Props) => {
  const locations = ['Rural', 'Semi-urban', 'Urban'];

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">I live in</Heading>
      <VStack space={4} w="100%">
        {locations.map((location) => (
          <Button
            key={location}
            size="lg"
            variant="outline"
            onPress={() => onNext('location', location.toLowerCase())}
          >
            {location}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default LocationSelection;