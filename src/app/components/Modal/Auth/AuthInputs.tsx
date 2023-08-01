import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import SignUp from './SignUp';
import Login from './LogIn';

const AuthInputs: React.FC = () => {
  const { modalState } = useAuthModal();

  return (
    <Stack>
      {modalState.view === 'signup' && <SignUp />}
      {modalState.view === 'login' && <Login />}
    </Stack>
  );
};
export default AuthInputs;
