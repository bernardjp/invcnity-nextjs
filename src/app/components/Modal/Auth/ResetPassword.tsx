import React, { useState } from 'react';
import { Button, Stack, Text, Image, Flex } from '@chakra-ui/react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { AuthValidation, validateEmail } from './utils/validation';
import StyledInput from './StyledInput';

function ResetPassword(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [formValidation, setFormValidation] = useState<AuthValidation>();
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormValidation(undefined);

    const emailValidation = validateEmail(email);

    if (emailValidation.isValidated) {
      //sendPasswordResetEmail(email);
      console.log('email sent to reset password');
    } else {
      setFormValidation(emailValidation);
    }
  };

  return (
    <Stack>
      <Flex justifyContent="center">
        <Image boxSize="50px" src="images/invcnity_icon.png" alt="..." />
      </Flex>
      <Text fontWeight="bold" fontSize={16} textAlign="center">
        Reset your password
      </Text>
      <Text fontSize={13} textAlign="center" mb={1}>
        Enter the email associated with your account and we`&apos;`ll send you a
        reset link
      </Text>
      <form onSubmit={onSubmitHandler}>
        <Stack>
          <StyledInput
            type="text"
            name="email"
            placeholder="Enter email"
            validation={formValidation}
            onChange={onChangeHandler}
          />
          {error && (
            <Text textAlign="center" fontSize={14} color="red.400">
              {FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
          )}
          <Button
            mt={1}
            borderRadius={50}
            color="white"
            backgroundColor="teal.500"
            type="submit"
            width="100%"
            _hover={{
              backgroundColor: 'teal.400',
            }}
          >
            Reset Password
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default ResetPassword;
