import React from 'react';
import { Box } from 'native-base';
import FinancialResultsScreen from './FinancialResultsScreen';

const MainApp = () => {
  return (
    <Box flex={1} bg="gray.50">
      <FinancialResultsScreen />
    </Box>
  );
};

export default MainApp;