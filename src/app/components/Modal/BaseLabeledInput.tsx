import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';

type Props = {
  label: string;
  children: React.ReactNode;
};

function BaseLabeledInput(props: Props) {
  const { label, children } = props;
  return (
    <VStack mb={2} gap="0" w="100%">
      <Text w="100%" color="gray.500" textAlign="left">
        {label}
      </Text>
      <Box w="100%" px="1rem">
        {children}
      </Box>
    </VStack>
  );
}

export default BaseLabeledInput;
