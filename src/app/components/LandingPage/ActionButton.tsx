'use client';
import React from 'react';
import { auth } from '@/firebase/clientApp';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Flex } from '@chakra-ui/react';
import CustomLink from '../Utils/CustomLink';

type Props = {};

function ActionButton({}: Props) {
  const [user] = useAuthState(auth);
  const { openModal } = useAuthModal();

  return (
    <Flex mt="2rem" justifyContent={{ base: 'center', md: 'flex-start' }}>
      {user ? (
        <CustomLink url="/listas" variant="primary">
          <span style={{ fontSize: '1.3rem' }}>Go to VCNITIES</span>
        </CustomLink>
      ) : (
        <Flex gap={4}>
          <Button onClick={() => openModal('login')} variant="primaryOutline">
            <span style={{ fontSize: '1.3rem' }}>Login</span>
          </Button>
          <Button onClick={() => openModal('signup')} variant="primary">
            <span style={{ fontSize: '1.3rem' }}>Sign Up</span>
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default ActionButton;
