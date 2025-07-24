import React from 'react';
import { VStack, Heading, Button } from 'native-base';

type Props = {
  onNext: (key: string, value: string) => void;
};

const GoalSelection = ({ onNext }: Props) => {
  const goals = ['Savings/Investing', 'Insurance', 'Loan Repayment/New loan'];

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">What is your goal?</Heading>
      <VStack space={4} w="100%">
        {goals.map((goal) => (
          <Button
            key={goal}
            size="lg"
            variant="outline"
            onPress={() => onNext('goal', goal.toLowerCase())}
          >
            {goal}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default GoalSelection;