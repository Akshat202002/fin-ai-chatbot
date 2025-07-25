import React from 'react';
import { VStack, Heading, Button, Text, Box, Pressable } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const InsuranceTypeSelection = ({ onNext }: Props) => {
  const types = [
    { display: 'Term Life Insurance', value: 'term' },
    { display: 'Whole Life Insurance', value: 'life' }
  ];

  return (
    // <VStack space={8} alignItems="center" w="100%">
    //   <Heading size="lg">Select Insurance Type</Heading>
    //   <Text textAlign="center" color="gray.600">
    //     Choose the type of life insurance that fits your needs
    //   </Text>
    //   <VStack space={4} w="100%">
    //     {types.map((type) => (
    //       <Button
    //         key={type.value}
    //         size="lg"
    //         variant="outline"
    //         onPress={() => onNext('insuranceType', type.value)}
    //       >
    //         {type.display}
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
      Select Insurance Type
    </Heading>

    <Text fontSize="md" color="gray.500" italic textAlign="center">
      Choose the type of life insurance that fits your needs.
    </Text>

    <VStack space={6} w="100%">
      {types.map((type) => (
        <Pressable
          key={type.value}
          onPress={() => onNext('insuranceType', type.value)}
          _pressed={{ opacity: 0.9 }}
        >
          <Box
            bg="#1975D3"
            borderRadius="2xl"
            py={4}
            px={6}
            alignItems="center"
            shadow={6}
            flexDirection="row"
            justifyContent="center"
          >
            <Text fontSize="xl" fontWeight="bold" color="white">
              {type.display}
            </Text>
          </Box>
        </Pressable>
      ))}
    </VStack>
  </VStack>
</Box>

  );
};

export default InsuranceTypeSelection;