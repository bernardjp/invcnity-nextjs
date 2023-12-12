'use client';
import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { LoadingEntry } from '../EstateDetails/LoadingSkeleton';

function LoadingDetails(): React.ReactElement {
  return (
    <Flex position="relative" w="100%">
      <Flex
        bg="white"
        border="2px solid"
        borderColor="white"
        borderRadius="24px"
        boxShadow="0px 10px 35px -20px rgba(0,0,0,0.5)"
        height="auto"
        p="1.5rem"
        w="100%"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          overflow="hidden"
          position="relative"
          w="100%"
          direction={{ base: 'column', md: 'row' }}
          gap="3rem"
        >
          <Flex h="100px" justifyContent="center" alignItems="center">
            <Image
              h="70%"
              w="auto"
              src={`/images/invcnity-logo.webp`}
              alt="INVCNITY Logo"
              opacity={0.3}
            />
          </Flex>
          <Flex justifyContent="space-between" w="90%" gap="2rem">
            <LoadingEntry />
            <LoadingEntry />
            <LoadingEntry />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LoadingDetails;
