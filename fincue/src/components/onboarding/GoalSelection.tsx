import React from 'react';
// import { VStack, Heading, Button, Text } from 'native-base';
import { VStack, Heading, Button, Box, Icon, Text, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onNext: (key: string, value: string) => void;
};

const GoalSelection = ({ onNext }: Props) => {
  const goals = [
    { display: 'Savings/Investing', value: 'savings' },
    { display: 'Insurance', value: 'insurance' },
    { display: 'Loan Repayment/New loan', value: 'loan' }
  ];

  return (
    // <VStack space={8} alignItems="center" w="100%">
    //   <Heading size="lg">What is your goal?</Heading>
    //   <Text textAlign="center" color="gray.600">
    //     We'll personalize your recommendations based on your financial goal
    //   </Text>
    //   <VStack space={4} w="100%">
    //     {goals.map((goal) => (
    //       <Button
    //         key={goal.value}
    //         size="lg"
    //         variant="outline"
    //         onPress={() => onNext('goal', goal.value)}
    //       >
    //         {goal.display}
    //       </Button>
    //     ))}
    //   </VStack>
    // </VStack>

    <Box
  flex={1}
  px={20}
  py={20}
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
    // maxW="1000"
    p={30}
    py={12}
    bg="white"
    borderRadius="3xl"
    shadow={10}
    borderWidth={2}
    borderColor="#1975D3"
  >
    <Heading size="2xl" color="#000056" fontWeight="extrabold" textAlign="center">
      What is your goal?
    </Heading>

    <Text fontSize="md" color="#555" textAlign="center">
      We'll personalize your recommendations based on your financial goal
    </Text>

    <VStack space={6} w="100%">
      {goals.map((goal) => (
        <Pressable
          key={goal.value}
          onPress={() => onNext('goal', goal.value)}
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
            <Text fontSize="xl" fontWeight="bold" color="white">
              {goal.display}
            </Text>
          </Box>
        </Pressable>
      ))}
    </VStack>
  </VStack>
</Box>
  );
};

export default GoalSelection;