import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import { ViewType } from '@/recoil/AuthModalAtom';

function AuthFooter(): React.ReactElement {
  const { modalState, changeView } = useAuthModal();

  const onChangeView = (currentView: ViewType): void => {
    if (currentView === 'login') changeView('signup');
    if (currentView === 'signup') changeView('login');
  };

  return (
    <>
      {modalState.view === 'resetPassword' ? (
        <Flex>
          <Button
            mr={1}
            colorScheme="teal"
            fontWeight="bold"
            fontSize="inherit"
            variant="link"
            onClick={() => changeView('login')}
          >
            LOG IN
          </Button>
          -
          <Button
            ml={1}
            colorScheme="teal"
            fontWeight="bold"
            fontSize="inherit"
            variant="link"
            onClick={() => changeView('signup')}
          >
            SIGN UP
          </Button>
        </Flex>
      ) : (
        <>
          <Flex>
            Forgot your password?
            <Button
              border="none"
              colorScheme="teal"
              fontSize="inherit"
              fontWeight="bold"
              variant="link"
              onClick={() => changeView('resetPassword')}
            >
              Reset
            </Button>
          </Flex>
          <Flex>
            {modalState.view === 'login'
              ? 'First time here?'
              : 'Already have an account?'}
            <Button
              ml={1}
              border="none"
              colorScheme="teal"
              fontWeight="bold"
              fontSize="inherit"
              variant="link"
              onClick={() => onChangeView(modalState.view)}
            >
              {modalState.view === 'login' ? 'SIGN UP' : 'LOG IN'}
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}

export default AuthFooter;
