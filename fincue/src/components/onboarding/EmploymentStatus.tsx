import React from 'react';
// import { VStack, Heading, Button } from 'native-base';
import { VStack, Heading, Box, Pressable, Icon, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onNext: (key: string, value: string) => void;
};

const EmploymentStatus = ({ onNext }: Props) => {
  const statuses = ['Student', 'Self Employed', 'Salaried', 'Retired'];

  const statusIcons: Record<string, string> = {
    Student: 'school-outline',
    'Self Employed': 'business-outline',
    Salaried: 'briefcase-outline',
    Retired: 'bed-outline',
  };

  const statusColors: Record<string, string> = {
    Student: '#1975D3',         // energetic blue
    'Self Employed': '#67A3D9', // independent cool
    Salaried: '#000056',        // deep corporate
    Retired: '#90e0ef',         // soft comfort
  };

  return (
    // <VStack space={8} alignItems="center" w="100%">
    //   <Heading size="lg">I am</Heading>
    //   <VStack space={4} w="100%">
    //     {statuses.map((status) => (
    //       <Button
    //         key={status}
    //         size="lg"
    //         variant="outline"
    //         onPress={() => onNext('employment', status.toLowerCase())}
    //       >
    //         {status}
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
    space={10}
    alignItems="center"
    w="140%"
    maxW="700"
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
      I am
    </Heading>

    <VStack space={6} w="100%">
      {statuses.map((status) => (
        <Pressable
          key={status}
          onPress={() => onNext('employment', status.toLowerCase())}
          _pressed={{ opacity: 0.9 }}
        >
          <Box
            bg={statusColors[status]}
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
              name={statusIcons[status]}
              color="white"
              size="lg"
              mr={3}
            />
            <Text fontSize="xl" fontWeight="bold" color="white">
              {status}
            </Text>
          </Box>
        </Pressable>
      ))}
    </VStack>
  </VStack>
</Box>

  );
};

export default EmploymentStatus;