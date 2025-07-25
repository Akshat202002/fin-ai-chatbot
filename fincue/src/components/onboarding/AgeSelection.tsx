import React from 'react';
// import { VStack, Heading, Button, Text } from 'native-base';
import { VStack, Heading, Text, Box, Pressable, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onNext: (key: string, value: string) => void;
};

const AgeSelection = ({ onNext }: Props) => {
  const ageGroups = ['18-24', '25-34', '35-44', '45+'];

   const ageIcons: Record<string, string> = {
    '18-24': 'rocket-outline',
    '25-34': 'briefcase-outline',
    '35-44': 'cash-outline',
    '45+': 'shield-checkmark-outline',
  };

  const ageColors: Record<string, string> = {
    '18-24': '#1975D3',
    '25-34': '#67A3D9',
    '35-44': '#90e0ef',
    '45+': '#000056',
  };

  return (
    // <VStack space={8} alignItems="center" w="100%">
    //   <Heading size="lg">What is your age?</Heading>
    //   <Text textAlign="center">
    //     We will personalise FinCue based on your answers
    //   </Text>
    //   <VStack space={4} w="100%">
    //     {ageGroups.map((age) => (
    //       <Button
    //         key={age}
    //         size="lg"
    //         variant="outline"
    //         onPress={() => onNext('age', age)}
    //       >
    //         {age}
    //       </Button>
    //     ))}
    //   </VStack>
    // </VStack>


    <Box
      flex={1}
      px={6}
      py={12}
      bg={{
        linearGradient: {
          colors: ['#E0ECFF', '#F8B7CD'],
          start: [0, 0],
          end: [1, 1],
        },
      }}
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        space={10}
        alignItems="center"
        w="100%"
        p={8}
        bg="white"
        borderRadius="3xl"
        shadow={10}
        borderWidth={2}
        borderColor="#1975D3"
      >
        <Heading size="2xl" color="#000056" fontWeight="extrabold" textAlign="center">
          What is your age?
        </Heading>

        <Text fontSize="md" color="gray.500" italic textAlign="center">
          We'll personalize <Text bold color="#1975D3">FinCue</Text> based on your answers.
        </Text>

        <VStack space={6} w="100%">
          {ageGroups.map((age) => (
            <Pressable
              key={age}
              onPress={() => onNext('age', age)}
              _pressed={{ opacity: 0.9 }}
            >
              <Box
                bg={ageColors[age]}
                borderRadius="2xl"
                py={4}
                px={6}
                alignItems="center"
                shadow={6}
                flexDirection="row"
                justifyContent="center"
              >
                <Icon
                  as={Ionicons}
                  name={ageIcons[age]}
                  color="white"
                  size="lg"
                  mr={3}
                />
                <Text fontSize="xl" fontWeight="bold" color="white">
                  {age}
                </Text>
              </Box>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default AgeSelection;