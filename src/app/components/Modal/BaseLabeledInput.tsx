import React from 'react';
import { VStack, Text, Flex } from '@chakra-ui/react';

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
      <Flex w="100%" px="1rem" alignItems="end">
        {children}
      </Flex>
    </VStack>
  );
}

export default BaseLabeledInput;
