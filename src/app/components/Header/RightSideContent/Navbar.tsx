'use client';
import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import { useSignOut } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';

type PropsType = {
  user: User | null | undefined;
};

const Navbar: React.FC<PropsType> = (props: PropsType) => {
  const { user } = props;
  const { openModal } = useAuthModal();
  const [signOut] = useSignOut(auth);

  const logoutHandler = () => signOut();

  return (
    <Flex alignItems="center" gap={4} display={{ base: 'none', md: 'flex' }}>
      {user ? (
        <>
          <Link href="/listas">Listas</Link>
          <Link href="/propiedades">Propiedades</Link>
          <Button onClick={logoutHandler}>Logout</Button>
        </>
      ) : (
        <>
          <Button onClick={() => openModal('login')}>Login</Button>
          <Button onClick={() => openModal('signup')}>Sign Up</Button>
        </>
      )}
    </Flex>
  );
};
export default Navbar;
