import React from 'react';
// import { VStack, Heading, Button, Text } from 'native-base';
import { VStack, Heading, Button, Box, Icon, Text, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onNext: (key: string, value: string) => void;
};

const LanguageSelection = ({ onNext }: Props) => {
  // return (
  //   <VStack space={8} alignItems="center" w="100%">
  //     <Heading size="lg">Language</Heading>
  //     <VStack space={4} w="100%">
  //       <Button 
  //         size="lg" 
  //         variant="outline"
  //         onPress={() => onNext('language', 'hindi')}
  //       >
  //         Hindi
  //       </Button>
  //       <Button 
  //         size="lg" 
  //         variant="outline"
  //         onPress={() => onNext('language', 'english')}
  //       >
  //         English
  //       </Button>
  //     </VStack>
  //   </VStack>
  // );


  return (
    <Box
      flex={1}
      px={6}
      py={12}
      bg={{
        linearGradient: {
          colors: ['#FFDEE9', '#B5FFFC'], // vibrant pastel gradient
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
        borderColor="#000056"
      >
        <Heading
          size="2xl"
          color="#000056"
          fontWeight="extrabold"
          textAlign="center"
        >
          Select your Language
        </Heading>

        <Text fontSize="md" color="gray.500" italic textAlign="center">
          Let us know how you want to talk.
        </Text>

        <VStack space={6} w="100%">
          <Pressable
            onPress={() => onNext('language', 'hindi')}
            _pressed={{ opacity: 0.9 }}
          >
            <Box
              bg="#90e0ef"
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
                name="chatbubble-ellipses-outline"
                color="white"
                size="lg"
                mr={3}
              />
              <Text fontSize="xl" fontWeight="bold" color="white">
                हिंदी  
              </Text>
            </Box>
          </Pressable>

          <Pressable
            onPress={() => onNext('language', 'english')}
            _pressed={{ opacity: 0.9 }}
          >
            <Box
              bg="#67A3D9"
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
                name="earth-outline"
                color="white"
                size="lg"
                mr={3}
              />
              <Text fontSize="xl" fontWeight="bold" color="white">
                 English 
              </Text>
            </Box>
          </Pressable>
        </VStack>
      </VStack>
    </Box>
  );
};

export default LanguageSelection;