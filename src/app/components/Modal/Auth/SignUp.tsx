import React, { useState } from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';
import StyledInput from './StyledInput';
import PasswordInput from './PasswordInput';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { SignUpValidation, validateSignUpForm } from './utils/validation';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { updateProfile } from 'firebase/auth';

function SignUp(): React.ReactElement {
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const [formError, setFormError] = useState<SignUpValidation | null>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formValues = {
      ...signupForm,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setSignupForm(formValues);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null); // Reset the validation errors.

    const { username, email, password, confirmPassword } = signupForm;
    const formValidation = validateSignUpForm(
      username,
      email,
      password,
      confirmPassword
    );

    if (formValidation.isValidated) {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile(auth.currentUser!, { displayName: username });
    } else {
      setFormError(formValidation);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <StyledInput
          type="text"
          name="username"
          placeholder="Enter username"
          validation={formError?.username}
          onChange={onChangeHandler}
        />
        <StyledInput
          type="email"
          name="email"
          placeholder="Enter email"
          validation={formError?.email}
          onChange={onChangeHandler}
        />
        <PasswordInput
          name="password"
          placeholder="Enter password"
          validation={formError?.password}
          onChange={onChangeHandler}
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm password"
          validation={formError?.confirmPassword}
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
          Sign Up
        </Button>
      </Stack>
    </form>
  );
}
export default SignUp;
