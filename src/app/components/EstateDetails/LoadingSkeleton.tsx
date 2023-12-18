'use client';
import React from 'react';
import { Flex, Image, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';

export function LoadingEntry(): React.ReactElement {
  return (
    <Stack gap="0.5rem" h="4rem" w="100%">
      <Skeleton
        startColor="brand.lightRed"
        endColor="brand.lightTeal"
        h="1.2rem"
        w="8rem"
      />
      <Stack h="2rem" alignItems="baseline">
        <Skeleton
          startColor="brand.lightRed"
          endColor="brand.lightTeal"
          h="1.4rem"
          w="12rem"
          maxW="60%"
        />
        <Skeleton
          startColor="brand.lightRed"
          endColor="brand.lightTeal"
          h="0.2rem"
          w="100%"
          ml="1rem"
        />
      </Stack>
    </Stack>
  );
}

export function LoadingIcon(): React.ReactElement {
  return (
    <SkeletonCircle
      size="10"
      startColor="brand.lightRed"
      endColor="brand.lightTeal"
    />
  );
}

function LoadingDetails(): React.ReactElement {
  return (
    <Flex position="relative" w="100%">
      <Flex position="absolute" top="1.5rem" left="1.5rem" gap="0.2rem">
        <LoadingIcon />
        <LoadingIcon />
        <LoadingIcon />
      </Flex>

      <Flex
        bg="white"
        border="2px solid"
        borderColor="white"
        borderRadius="24px"
        flexDir="column"
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
        >
          <Stack gap="1rem" w={{ base: '100%', md: '48%' }}>
            <Flex h="14rem" justifyContent="center">
              <Image
                h="90%"
                w="auto"
                src="/images/invcnity-logo.webp"
                alt="INVCNITY Logo"
                opacity={0.3}
                p="2rem 1rem 0 1rem"
              />
            </Flex>
            <LoadingEntry />
            <LoadingEntry />
          </Stack>

          <Stack
            gap="1rem"
            display={{ base: 'none', sm: 'flex' }}
            w={{ base: '100%', md: '48%' }}
          >
            <LoadingEntry />
            <LoadingEntry />
            <LoadingEntry />
            <Flex gap="1rem">
              <LoadingEntry />
              <LoadingEntry />
            </Flex>
            <LoadingEntry />
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LoadingDetails;
