import React from 'react';
import { Text, Button } from '@chakra-ui/react';
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
      <Text fontWeight="bold" fontSize={13}>
        {modalState.view === 'login'
          ? 'First time here?'
          : 'Already have an account?'}
        <Button
          marginLeft={1}
          colorScheme="red"
          fontWeight="inherit"
          fontSize="inherit"
          variant="link"
          onClick={() => onChangeView(modalState.view)}
        >
          {modalState.view === 'login' ? 'SIGN UP' : 'LOG IN'}
        </Button>
      </Text>
    </>
  );
}

export default AuthFooter;
