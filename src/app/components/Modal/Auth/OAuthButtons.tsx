import React from 'react';
import { Button, Image, Stack, Text } from '@chakra-ui/react';
import { auth } from '@/firebase/clientApp';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '@/firebase/errors';

function OAuthButtons(): React.ReactElement {
  const [signInWithGoogle, user, loading, userError] =
    useSignInWithGoogle(auth);

  const googleAuthHandler = () => {
    signInWithGoogle();
  };

  return (
    <Stack gap={1}>
      <Button
        borderColor="gray.300"
        variant="outline"
        borderRadius={45}
        isLoading={loading}
        onClick={() => googleAuthHandler()}
      >
        <Image
          borderRadius="full"
          boxSize="25px"
          mr={3}
          src="/images/google_logo.png"
          alt="google-icon"
        />
        Continue with Google
      </Button>
      {userError && (
        <Text textAlign="center" fontSize={14} color="red.400">
          {FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
    </Stack>
  );
}

export default OAuthButtons;
