'use client';
import React from 'react';
import Link from 'next/link';
import { Flex } from '@chakra-ui/react';

const index: React.FC = () => {
  return (
    <Flex>
      <Link href="/">Home</Link>
    </Flex>
  );
};
export default index;
