import React from 'react';
// import { VStack, Heading, Button } from 'native-base';
import { VStack, Heading, Box, Icon, Text, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onNext: (key: string, value: string) => void;
};



const SpeciallyAbledSelection = ({ onNext }: Props) => {
  const options = ['Yes', 'No'];

  
  const optionIcons: Record<string, string> = {
    Yes: 'accessibility',
    No: 'close-circle-outline',
  };

  const optionColors: Record<string, string> = {
    Yes: '#1975D3', // blue
    No: '#000056',  // deep navy
  };

  

  return (
    // <VStack space={8} alignItems="center" w="100%">
    //   <Heading size="lg">Specially abled?</Heading>
    //   <VStack space={4} w="100%">
    //     {options.map((option) => (
    //       <Button
    //         key={option}
    //         size="lg"
    //         variant="outline"
    //         onPress={() => onNext('speciallyAbled', option.toLowerCase())}
    //       >
    //         {option}
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
          colors: ['#F8B7CD', '#E0ECFF'],
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
        <Heading
          size="2xl"
          color="#000056"
          fontWeight="extrabold"
          textAlign="center"
        >
          Specially Abled?
        </Heading>

        <Text fontSize="md" color="gray.500" italic textAlign="center">
          Let us know if we should personalize your experience.
        </Text>

        <VStack space={6} w="100%">
          {options.map((option) => (
            <Pressable
              key={option}
              onPress={() => onNext('speciallyAbled', option.toLowerCase())}
              _pressed={{ opacity: 0.9 }}
            >
              <Box
                bg={optionColors[option]}
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
                  name={optionIcons[option]}
                  color="white"
                  size="lg"
                  mr={3}
                />
                <Text fontSize="xl" fontWeight="bold" color="white">
                  {option}
                </Text>
              </Box>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default SpeciallyAbledSelection;