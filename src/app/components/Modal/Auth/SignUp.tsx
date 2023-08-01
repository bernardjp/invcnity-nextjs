import React, { useState } from 'react';
import { Button, Stack } from '@chakra-ui/react';
import StyledInput from './StyledInput';
import PasswordInput from './PasswordInput';
import { useAuthModal } from '@/app/hooks/useAuthModal';

function SignUp(): React.ReactElement {
  const { closeModal } = useAuthModal(); // Placeholder functionality
  const [signupForm, setSignupForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formValues = {
      ...signupForm,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setSignupForm(formValues);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('signed in:', signupForm);
    closeModal(); // Placeholder functionality
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <StyledInput
          type="text"
          name="email"
          placeholder="Enter email"
          onChange={onChangeHandler}
        />
        <StyledInput
          type="text"
          name="username"
          placeholder="Enter username"
          onChange={onChangeHandler}
        />
        <PasswordInput
          name="password"
          placeholder="Enter password"
          onChange={onChangeHandler}
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={onChangeHandler}
        />
        <Button borderRadius={50} colorScheme="blue" type="submit" width="100%">
          Sign Up
        </Button>
      </Stack>
    </form>
  );
}
export default SignUp;
