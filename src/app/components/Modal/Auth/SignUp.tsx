import React, { useState } from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';
import StyledInput from '../StyledInput';
import PasswordInput from './PasswordInput';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { SignUpValidation, validateSignUpForm } from './utils/validation';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { createUserDocument } from '@/firebase/authUtils';
import { updateProfile } from 'firebase/auth';
import StyledSubmitButton from '../StyledSubmitButton';

const FORM_DEFAULT_VALUES = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUp(): React.ReactElement {
  const [signupForm, setSignupForm] = useState(FORM_DEFAULT_VALUES);
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

    // Extracs the data from the form.
    const { username, email, password, confirmPassword } = signupForm;

    // Validate the format of the data.
    const formValidation = validateSignUpForm(
      username,
      email,
      password,
      confirmPassword
    );
    if (!formValidation.isValidated) {
      setFormError(formValidation);
      return;
    }

    // Verifies the uniqueness of the username in the DB.
    // NOTE: Obsolete requirement. Firebase rules are not configured to accept this request.
    // const isUsernameUnique = await verifyUniqueUsername(username);
    // if (!isUsernameUnique) {
    //   setFormError({
    //     ...formValidation,
    //     username: {
    //       errorMessage: `Username ${username} already exist. Try another one.`,
    //       isValidated: false,
    //     },
    //   });
    //   return;
    // }

    // Registers the user in the AuthDB and creates a new user in the DocumentsDB.
    try {
      const newUser = await createUserWithEmailAndPassword(email, password);
      await updateProfile(auth.currentUser!, { displayName: username });

      if (newUser) await createUserDocument(newUser);
      setFormError(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <StyledInput
          variant="outline"
          type="text"
          name="username"
          placeholder="Enter username"
          validation={formError?.username}
          onChange={onChangeHandler}
        />
        <StyledInput
          variant="outline"
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
        <StyledSubmitButton loading={loading} text="Sign Up" />
      </Stack>
    </form>
  );
}
export default SignUp;
