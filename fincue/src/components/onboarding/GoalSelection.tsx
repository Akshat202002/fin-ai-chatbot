import React from 'react';
import { VStack, Heading, Button, Text } from 'native-base';

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
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">What is your goal?</Heading>
      <Text textAlign="center" color="gray.600">
        We'll personalize your recommendations based on your financial goal
      </Text>
      <VStack space={4} w="100%">
        {goals.map((goal) => (
          <Button
            key={goal.value}
            size="lg"
            variant="outline"
            onPress={() => onNext('goal', goal.value)}
          >
            {goal.display}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default GoalSelection;