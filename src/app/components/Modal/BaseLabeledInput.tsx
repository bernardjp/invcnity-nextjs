import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';

type Props = {
  label: string;
  children: React.ReactNode;
};

function BaseLabeledInput(props: Props) {
  const { label, children } = props;
  return (
    <VStack mb={2} gap="0">
      <Text
        w="100%"
        color="gray.500"
        textAlign={{ base: 'center', sm: 'left' }}
      >
        {label}
      </Text>
      <Box w={{ base: '100%', sm: '90%' }}>{children}</Box>
    </VStack>
  );
}

export default BaseLabeledInput;
