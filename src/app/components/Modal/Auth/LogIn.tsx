import React, { useState } from 'react';
import { Button, Stack } from '@chakra-ui/react';
import StyledInput from './StyledInput';
import PasswordInput from './PasswordInput';
import { useAuthModal } from '@/app/hooks/useAuthModal';

function Login(): React.ReactElement {
  const { closeModal } = useAuthModal(); // Placeholder functionality
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formValues = {
      ...loginForm,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setLoginForm(formValues);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('logged in:', loginForm);
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
        <PasswordInput
          name="password"
          placeholder="Enter password"
          onChange={onChangeHandler}
        />
        <Button borderRadius={50} colorScheme="blue" type="submit" width="100%">
          Login
        </Button>
      </Stack>
    </form>
  );
}
export default Login;
