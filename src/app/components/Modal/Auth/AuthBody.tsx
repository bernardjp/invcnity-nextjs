import React from 'react';
import { Text } from '@chakra-ui/react';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPassword';
import { useAuthModal } from '@/app/hooks/useAuthModal';

function AuthBody() {
  const { modalState } = useAuthModal();

  return (
    <div style={{ marginTop: '1rem' }}>
      {modalState.view === 'resetPassword' ? (
        <ResetPassword />
      ) : (
        <>
          <OAuthButtons />
          <Text
            color="gray.400"
            fontWeight="bold"
            fontSize={12}
            my={3}
            textAlign="center"
          >
            OR
          </Text>
          <AuthInputs />
        </>
      )}
    </div>
  );
}

export default AuthBody;
