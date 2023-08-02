import { Button, Image, Stack } from '@chakra-ui/react';
import React from 'react';

function OAuthButtons(): React.ReactElement {
  return (
    <Stack mb={5} gap={1}>
      <Button
        borderColor="gray.300"
        variant="outline"
        borderRadius={45}
        onClick={() => {}}
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
    </Stack>
  );
}

export default OAuthButtons;
