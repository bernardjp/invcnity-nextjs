'use client';
import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import { useSignOut } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import { usePathname } from 'next/navigation';
import CustomLink from '../../Utils/CustomLink';

type PropsType = {
  user: User | null | undefined;
};

const Navbar: React.FC<PropsType> = (props: PropsType) => {
  const { user } = props;
  const { openModal } = useAuthModal();
  const [signOut] = useSignOut(auth);
  const page = usePathname().split('/')[1];

  const logoutHandler = () => signOut();

  return (
    <Flex alignItems="center" gap={2} display={{ base: 'none', md: 'flex' }}>
      {user ? (
        <>
          <CustomLink
            url="/listas"
            variant={
              page === 'listas' || page === 'propiedades'
                ? 'secondary'
                : 'secondaryOutline'
            }
          >
            Listas
          </CustomLink>
          <CustomLink
            url={`/user/${user.uid}`}
            variant={page === 'user' ? 'tertiary' : 'tertiaryOutline'}
          >
            Account
          </CustomLink>
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
