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
          <Link href="/listas">Lists</Link>
          <Link href={`/user/${user.uid}`}>Account</Link>
          <Button variant="primaryOutline" onClick={logoutHandler}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button variant="primaryOutline" onClick={() => openModal('login')}>
            Login
          </Button>
          <Button variant="primary" onClick={() => openModal('signup')}>
            Sign Up
          </Button>
        </>
      )}
    </Flex>
  );
};
export default Navbar;
