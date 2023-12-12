'use client';
import React, { useState, useEffect } from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { EstateListDoc, UserDoc } from '@/firebase/customTypes';
import { auth } from '@/firebase/clientApp';
import { useDisableForm } from '@/app/hooks/useDisableForm';
import useFormAlert from '@/app/hooks/useFormAlert';
import { AlertState } from '@/recoil/FormAlertAtom';
import StyledInput from '../Modal/StyledInput';
import BaseLabeledInput from '../Modal/BaseLabeledInput';
import StyledSubmitButton from '../Modal/StyledSubmitButton';
import {
  UserValidation,
  validateUserForm,
} from '../Modal/Auth/utils/validation';
import { updateUserAccount } from '@/firebase/authUtils';

function UserDetails(props: {
  userData: UserDoc;
  listSnippets?: EstateListDoc[];
}) {
  const { userData } = props;
  const [userCredentials] = useAuthState(auth);

  const { closeAlert, setAlertState } = useFormAlert();
  const { isDisabled, toggleDisable } = useDisableForm();
  const [loading, setLoading] = useState<boolean>(false);

  // Form state
  const [userFormData, setFormData] = useState(userData);
  const [formError, setFormError] = useState<UserValidation | null>(null);

  // Resets the form to its default values when it's disabled.
  useEffect(() => {
    if (isDisabled) setFormData(userData);
  }, [isDisabled, userData]);

  const onSubmitHandler = () => {
    setFormError(null); // Reset the validation errors.
    setLoading(true);

    const userId = userCredentials?.uid;
    if (!userId) return;

    // Validate the format of the data.
    // TO-DO: create function validateUserForm
    const formValidation = validateUserForm(
      userFormData.username!,
      userFormData.email!
    );
    if (!formValidation.isValidated) {
      setFormError(formValidation);
      return;
    }

    try {
      updateUserAccount(userFormData.username!, userFormData.email!);
      setFormError(null);
      toggleDisable(); // close the "edition mode".
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onResetHandler = () => {
    const alertMessage: AlertState = {
      isOpen: true,
      title: 'Discard Changes?',
      dialog: 'Are you sure you want to discard all the changes?',
      submitHandler: () => {
        setFormData(userData);
        closeAlert();
      },
    };
    setAlertState(alertMessage);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Flex
      bg="white"
      border="2px solid"
      borderColor={isDisabled ? 'white' : 'brand.teal'}
      borderRadius="24px"
      boxShadow="0px 10px 20px -3px #6d555552"
      padding={{ base: '1rem', sm: '1.5rem' }}
      width="100%"
    >
      <form style={{ width: '100%' }}>
        <Flex direction={{ base: 'column', md: 'row' }} gap="3rem">
          <Flex maxH="312px" alignItems="center" justifyContent="center">
            <Image
              alt=""
              borderRadius="full"
              h={{ base: '150px', md: '100px' }}
              w={{ base: '150px', md: '100px' }}
              src={
                userData.providerData[0].photoURL ||
                '/images/user-default-pic-color.webp'
              }
            />
          </Flex>
          <Flex
            justifyContent="end"
            alignItems="center"
            w={{ base: '100%', md: '90%' }}
          >
            <Flex w="100%" direction={{ base: 'column', md: 'row' }}>
              <BaseLabeledInput label="Username">
                <StyledInput
                  type="text"
                  variant="flushed"
                  name="username"
                  placeholder="Choose a Username"
                  // validation={formError?.username}
                  value={userFormData.username || ''}
                  onChange={onChangeHandler}
                  isDisabled={isDisabled}
                />
              </BaseLabeledInput>
              <BaseLabeledInput label="Name">
                <StyledInput
                  type="text"
                  variant="flushed"
                  name="displayName"
                  placeholder="Choose a Name"
                  // validation={formError?.displayName}
                  value={userFormData.providerData[0].displayName || ''}
                  onChange={onChangeHandler}
                  isDisabled={isDisabled}
                />
              </BaseLabeledInput>
              <BaseLabeledInput label="Email">
                {userCredentials?.providerData[0].providerId ===
                  'google.com' && (
                  <Image
                    borderRadius="full"
                    boxSize="25px"
                    mr={3}
                    src="/images/google_logo.png"
                    alt="google-icon"
                    mb="4px"
                  />
                )}
                <StyledInput
                  type="text"
                  variant="flushed"
                  name="email"
                  placeholder=""
                  validation={formError?.email}
                  value={userFormData.email || ''}
                  onChange={() => {}}
                  isDisabled={
                    // The email shouldn't be changed if OAuth was used
                    userCredentials?.providerData[0].providerId != 'password'
                  }
                />
              </BaseLabeledInput>
            </Flex>
          </Flex>
        </Flex>

        {!isDisabled && (
          <Flex gap={5} mt={6}>
            <StyledSubmitButton
              loading={loading}
              type={'reset'}
              text="Reset User data"
              onClickHandler={onResetHandler}
            />
            <StyledSubmitButton
              loading={loading}
              type={'submit'}
              text="Update User data"
              onClickHandler={onSubmitHandler}
            />
          </Flex>
        )}
      </form>
    </Flex>
  );
}

export default UserDetails;
