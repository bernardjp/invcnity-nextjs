'use client';
import React from 'react';
import { Flex, Image, Skeleton, SkeletonCircle } from '@chakra-ui/react';

function LoadingCard(): React.ReactElement {
  return (
    <Flex position="relative">
      <SkeletonCircle
        size="10"
        startColor="brand.lightRed"
        endColor="brand.lightTeal"
        position="absolute"
        left={2}
        top={2}
      />
      <Flex
        bg="white"
        border="2px solid"
        borderColor="white"
        borderRadius="24px"
        flexDir="column"
        boxShadow="0px 10px 35px -20px rgba(238, 152, 0, 0.5)"
        height="fit-content"
      >
        <Flex
          alignItems="center"
          height="12rem"
          justifyContent="center"
          overflow="hidden"
          p={4}
          position="relative"
          width="18rem"
        >
          <Image
            width="12rem"
            src={`/images/invcnity-logo.webp`}
            alt="INVCNITY Logo"
            opacity={0.3}
          />
        </Flex>

        <Flex
          alignItems="center"
          color="brand.lightChocolate"
          fontSize="18px"
          fontWeight="bold"
          height="2rem"
          justifyContent="space-evenly"
          mb={3}
          opacity={0.5}
        >
          LOADING...
        </Flex>
        <Skeleton
          startColor="brand.lightRed"
          endColor="brand.lightTeal"
          height="calc(2rem + 28px)"
          borderBottomEndRadius="21px"
          borderBottomLeftRadius="21px"
        />
      </Flex>
    </Flex>
  );
}

export default LoadingCard;
