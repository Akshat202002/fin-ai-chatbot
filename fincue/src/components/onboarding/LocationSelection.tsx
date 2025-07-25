import React from 'react';
// import { VStack, Heading, Button } from 'native-base';
import { Box, VStack, Heading, Text, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onNext: (key: string, value: string) => void;
};

const LocationSelection = ({ onNext }: Props) => {
  const locations = ['Rural', 'Semi-urban', 'Urban'];

  const locationColors = {
    Rural: '#67A3D9',
    'Semi-urban': '#90e0ef',
    Urban: '#1975D3',
  };
  const locationIcons = {
    Rural: 'leaf-outline',
    'Semi-urban': 'business-outline',
    Urban: 'location-outline',
  };

  return (
    // <VStack space={8} alignItems="center" w="100%">
    //   <Heading size="lg">I live in</Heading>
    //   <VStack space={4} w="100%">
    //     {locations.map((location) => (
    //       <Button
    //         key={location}
    //         size="lg"
    //         variant="outline"
    //         onPress={() => onNext('location', location.toLowerCase())}
    //       >
    //         {location}
    //       </Button>
    //     ))}
    //   </VStack>
    // </VStack>


    <Box
      flex={1}
      px={8}
      py={16}
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
        space={8}
        alignItems="center"
        w="130%"
        // maxW="90%"
        px={10}
        py={12}
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
          I live in
        </Heading>

        <VStack space={6} w="100%">
          {locations.map((location) => (
            <Pressable
              key={location}
              onPress={() => onNext('location', location.toLowerCase())}
              _pressed={{ opacity: 0.9 }}
            >
              <Box
                bg={locationColors[location as keyof typeof locationColors]}
                borderRadius="2xl"
                py={5}
                px={6}
                alignItems="center"
                shadow={6}
                flexDirection="row"
                justifyContent="center"
                w="100%"
              >
                <Icon
                  as={Ionicons}
                  name={locationColors[location as keyof typeof locationColors]}
                  color="white"
                  size="lg"
                  mr={3}
                />
                <Text fontSize="xl" fontWeight="bold" color="white">
                  {location}
                </Text>
              </Box>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default LocationSelection;