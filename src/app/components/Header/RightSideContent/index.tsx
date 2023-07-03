'use client';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import Link from 'next/link';

const RightSideContent: React.FC = () => {
  return (
    <Flex>
      <Flex alignItems="center">
        <Link href="listas">Listas</Link>
        <Link href="propiedades">Propiedades</Link>
      </Flex>
      {/* Authentication button: Sign Up | Log In */}
      <button>Sign Up</button>
    </Flex>
  );
};
export default RightSideContent;
