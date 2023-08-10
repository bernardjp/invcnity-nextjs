import React, { useState } from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';
import StyledInput from './StyledInput';
import PasswordInput from './PasswordInput';
import { auth } from '@/firebase/clientApp';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { LoginValidation, validateLoginForm } from './utils/validation';

function Login(): React.ReactElement {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signInWithEmailAndPassword, user, loading, userError] =
    useSignInWithEmailAndPassword(auth);
  const [formValidation, setFormValidation] = useState<LoginValidation | null>(
    null
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formValues = {
      ...loginForm,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setLoginForm(formValues);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormValidation(null);

    const { email, password } = loginForm;
    const loginValidation = validateLoginForm(email, password);

    if (loginValidation.isValidated) {
      signInWithEmailAndPassword(email, password);
    } else {
      setFormValidation(loginValidation);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <StyledInput
          type="text"
          name="email"
          placeholder="Enter email"
          validation={formValidation?.email}
          onChange={onChangeHandler}
        />
        <PasswordInput
          name="password"
          placeholder="Enter password"
          validation={formValidation?.password}
          onChange={onChangeHandler}
        />
        {userError && (
          <Text textAlign="center" fontSize={14} color="red.400">
            {FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]}
          </Text>
        )}
        <Button
          mt={1}
          isLoading={loading}
          borderRadius={50}
          color="white"
          backgroundColor="teal.500"
          type="submit"
          width="100%"
          _hover={{
            backgroundColor: 'teal.400',
          }}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}
export default Login;