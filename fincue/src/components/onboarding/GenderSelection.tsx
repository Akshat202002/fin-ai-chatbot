import React from 'react';
// import { VStack, Heading, Button } from 'native-base';
import { VStack, Heading, Button, Box, Icon, Text, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onNext: (key: string, value: string) => void;
};

const GenderSelection = ({ onNext }: Props) => {
  const genders = ['Male', 'Female', 'Others', 'Prefer Not to Say'];


  const genderIcons: Record<string, string> = {
    Male: 'male',
    Female: 'female',
    Others: 'transgender',
    'Prefer Not to Say': 'help-circle-outline',
  };

  const genderColors: Record<string, string> = {
    Male: '#1975D3',
    Female: '#90e0ef',
    Others: '#67A3D9',
    'Prefer Not to Say': '#000056',
  };

  return (
    // <VStack space={8} alignItems="center" w="100%">
    //   <Heading size="lg">Gender</Heading>
    //   <VStack space={4} w="100%">
    //     {genders.map((gender) => (
    //       <Button
    //         key={gender}
    //         size="lg"
    //         variant="outline"
    //         onPress={() => onNext('gender', gender.toLowerCase())}
    //       >
    //         {gender}
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
          colors: ['#F8B7CD', '#EAF6FF'],
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
           Select Your Gender
        </Heading>

        <VStack space={5} w="100%">
          {genders.map((gender) => (
            <Pressable
              key={gender}
              onPress={() => onNext('gender', gender.toLowerCase())}
              _pressed={{ opacity: 0.85 }}
            >
              <Box
                bg={genderColors[gender]}
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
                  name={genderIcons[gender]}
                  color="white"
                  size="lg"
                  mr={3}
                />
                <Text fontSize="xl" fontWeight="bold" color="white">
                  {gender}
                </Text>
              </Box>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </Box>
  
  );
};

export default GenderSelection;