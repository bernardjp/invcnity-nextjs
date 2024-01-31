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
        <CustomLink url="/listas" variant="neutralOutline">
          <span style={{ fontSize: '1.3rem' }}>Go to VCNITIES</span>
        </CustomLink>
      ) : (
        <Flex gap={4}>
          <Button
            onClick={() => openModal('signup')}
            variant="primary"
            p="1.5rem"
            border="2px solid"
            borderColor="beige"
            _hover={{
              bg: 'beige',
              color: '#ff6d60',
              borderColor: '#ff6d60',
              transform: 'translate(0, 2px)',
            }}
            _active={{
              bg: 'brand.darkRed',
              color: 'white',
              borderColor: 'white',
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>Get Started!</span>
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default ActionButton;
