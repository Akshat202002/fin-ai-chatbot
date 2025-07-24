import React from 'react';
import { VStack, Heading, Button, Text } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const LanguageSelection = ({ onNext }: Props) => {
  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">Language</Heading>
      <VStack space={4} w="100%">
        <Button 
          size="lg" 
          variant="outline"
          onPress={() => onNext('language', 'hindi')}
        >
          Hindi
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          onPress={() => onNext('language', 'english')}
        >
          English
        </Button>
      </VStack>
    </VStack>
  );
};

export default LanguageSelection;