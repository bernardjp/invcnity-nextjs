'use client';
import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useAuthModal } from '@/app/hooks/useAuthModal';

const RightSideContent: React.FC = () => {
  const { openModal } = useAuthModal();

  return (
    <Flex alignItems="center" gap={4}>
      <Link href="listas">Listas</Link>
      <Link href="propiedades">Propiedades</Link>
      <Button onClick={() => openModal()}>Sign Up</Button>
    </Flex>
  );
};
export default RightSideContent;
