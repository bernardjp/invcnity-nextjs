import React from 'react';
import Link from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import { auth } from '@/firebase/clientApp';
import { useSignOut } from 'react-firebase-hooks/auth';

type DropdownPropType = {
  user: User | null | undefined;
};

function Dropdown(props: DropdownPropType): React.ReactElement {
  const { user } = props;
  const { openModal } = useAuthModal();
  const [signOut] = useSignOut(auth);

  const logoutHandler = () => signOut();

  return (
    <Flex display={{ md: 'none' }}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          {user ? (
            <>
              <MenuItem>
                <Link href="listas">Listas</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => openModal('login')}>Login</MenuItem>
              <MenuItem onClick={() => openModal('signup')}>Sign up</MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Dropdown;
