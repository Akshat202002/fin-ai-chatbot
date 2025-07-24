import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  ScrollView,
  Badge,
  Divider,
  Button,
  Spinner,
  Center
} from 'native-base';
import { useUser } from '../context/UserContext';
import AIService, { PersonaAnalysis, FinancialRecommendation } from '../services/AIService';

const FinancialResultsScreen = () => {
  const { userProfile, resetProfile } = useUser();
  const [analysis, setAnalysis] = useState<PersonaAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyzeProfile();
  }, []);

  const analyzeProfile = async () => {
    if (!userProfile) return;
    
    try {
      setLoading(true);
      const result = await AIService.analyzeUserProfile(userProfile);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getPersonaDisplayName = (persona: string) => {
    const names: Record<string, string> = {
      student: 'Student',
      genz: 'Gen Z Professional',
      women: 'Women Entrepreneur',
      elderly: 'Senior Citizen',
      urban: 'Urban Professional',
      insurance_seeker: `Insurance Seeker (${userProfile?.insuranceType === 'term' ? 'Term' : 'Life'})`,
      general: 'General Profile'
    };
    return names[persona] || 'General Profile';
  };

  const handleUpdateProfile = async () => {
    console.log('Update profile button clicked');
    await resetProfile();
  };

  if (loading) {
    return (
      <Center flex={1} bg="white">
        <Spinner size="lg" />
        <Text mt={4}>Analyzing your financial profile...</Text>
      </Center>
    );
  }

  if (!analysis) {
    return (
      <Center flex={1} bg="white">
        <Text>Unable to analyze profile. Please try again.</Text>
        <Button mt={4} onPress={analyzeProfile}>Retry</Button>
      </Center>
    );
  }

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <ScrollView>
        <VStack space={6} p={4}>
          {/* Header */}
          <Box bg="white" p={4} rounded="lg" shadow={1}>
            <VStack space={3}>
              <Heading size="lg" color="primary.600">
                Your Financial Profile
              </Heading>
              
              <HStack justifyContent="space-between" alignItems="center">
                <VStack>
                  <Text fontSize="md" color="gray.600">Detected Persona</Text>
                  <Text fontSize="xl" fontWeight="bold">
                    {getPersonaDisplayName(analysis.detectedPersona)}
                  </Text>
                </VStack>
                <Badge 
                  colorScheme="green" 
                  variant="solid" 
                  rounded="full"
                  px={3}
                  py={1}
                >
                  {analysis.confidence}% Match
                </Badge>
              </HStack>
            </VStack>
          </Box>

          {/* Recommendations Table */}
          <Box bg="white" rounded="lg" shadow={1}>
            <VStack space={0}>
              <Box p={4} bg="primary.50" roundedTop="lg">
                <Heading size="md" color="primary.700">
                  Personalized Recommendations
                </Heading>
              </Box>
              
              {analysis.recommendations.map((rec: FinancialRecommendation, index: number) => (
                <Box key={index}>
                  <VStack space={3} p={4}>
                    <HStack justifyContent="space-between" alignItems="flex-start">
                      <VStack flex={1} space={1}>
                        <HStack alignItems="center" space={2}>
                          <Text fontSize="sm" color="gray.500" fontWeight="medium">
                            {rec.category.toUpperCase()}
                          </Text>
                          <Badge 
                            colorScheme={getPriorityColor(rec.priority)} 
                            size="sm"
                          >
                            {rec.priority.toUpperCase()}
                          </Badge>
                        </HStack>
                        <Text fontSize="lg" fontWeight="bold" color="gray.800">
                          {rec.title}
                        </Text>
                        <Text fontSize="md" color="gray.600">
                          {rec.description}
                        </Text>
                      </VStack>
                    </HStack>
                    
                    {/* Action Items */}
                    <VStack space={2} mt={2}>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                        Action Items:
                      </Text>
                      {rec.actionItems.map((item: string, itemIndex: number) => (
                        <HStack key={itemIndex} alignItems="flex-start" space={2}>
                          <Text fontSize="sm" color="primary.500" mt={0.5}>•</Text>
                          <Text fontSize="sm" color="gray.600" flex={1}>
                            {item}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                  
                  {index < analysis.recommendations.length - 1 && <Divider />}
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Insights */}
          <Box bg="white" p={4} rounded="lg" shadow={1}>
            <VStack space={3}>
              <Heading size="md" color="primary.700">
                Key Insights for You
              </Heading>
              
              {analysis.insights.map((insight: string, index: number) => (
                <HStack key={index} alignItems="flex-start" space={3}>
                  <Text fontSize="lg" color="primary.500" mt={1}>💡</Text>
                  <Text fontSize="sm" color="gray.700" flex={1}>
                    {insight}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Action Button */}
          <Button 
            size="lg" 
            colorScheme="primary"
            onPress={handleUpdateProfile}
          >
            Update My Profile
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default FinancialResultsScreen;