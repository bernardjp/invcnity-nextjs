'use client';
import React from 'react';
import Link from 'next/link';
import { Flex, Image, Text } from '@chakra-ui/react';

const LeftSideContent: React.FC = () => {
  return (
    <Flex>
      <Link href="/">
        <Flex gap={2} alignItems="center">
          <Image width={8} src="/images/invcnity-logo.webp" alt="" />
          <Text
            fontSize={22}
            fontWeight="bold"
            display={{ base: 'none', sm: 'block' }}
          >
            IN/VCNITY
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};
export default LeftSideContent;
