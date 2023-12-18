import React from 'react';
import { LoadingIcon } from '../EstateDetails/LoadingSkeleton';
import { Flex, Skeleton } from '@chakra-ui/react';

function LoadingSnippet() {
  return (
    <Flex
      borderRadius="24px"
      boxShadow="0px 5px 15px -7px rgba(0,0,0,0.5)"
      p="8px 8px 8px 20px"
      bg="white"
      alignItems="center"
      fontSize="1.1rem"
      fontWeight="bold"
      gap="1rem"
      zIndex={3}
      maxWidth="280px"
      w="100%"
      justifyContent="space-between"
    >
      <Skeleton
        startColor="brand.lightRed"
        endColor="brand.lightTeal"
        h="1.2rem"
        w="8rem"
      />
      <LoadingIcon />
    </Flex>
  );
}

function LoadingSnippetsList() {
  return (
    <Flex w="100%" gap="2rem">
      <LoadingSnippet />
      <LoadingSnippet />
      <LoadingSnippet />
    </Flex>
  );
}

export default LoadingSnippetsList;
