'use client';
import React, { useState, useEffect } from 'react';
import { Flex, Image, Stack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserDoc } from '@/firebase/customTypes';
import { auth } from '@/firebase/clientApp';
import { useDisableForm } from '@/app/hooks/useDisableForm';
import useFormAlert from '@/app/hooks/useFormAlert';
import { AlertState } from '@/recoil/FormAlertAtom';
import StyledInput from '../Modal/StyledInput';
import BaseLabeledInput from '../Modal/BaseLabeledInput';
import StyledSubmitButton from '../Modal/StyledSubmitButton';
import { EstateFormValidation } from '../Modal/EstateCreation/utils/validation';

function UserDetails(props: { userData: UserDoc }) {
  const { userData } = props;
  const params: { id: string } = useParams();
  const [userCredentials] = useAuthState(auth);

  const { closeAlert, setAlertState } = useFormAlert();
  const { isDisabled, toggleDisable } = useDisableForm();
  const [loading, setLoading] = useState<boolean>(false);

  // Form state
  const [userFormData, setFormData] = useState(userData);
  const [formError, setFormError] = useState<EstateFormValidation | null>(null);

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
    // const formValidation = validateUserForm(userFormData);
    // if (!formValidation.isValidated) {
    //   setFormError(formValidation);
    //   return;
    // }

    try {
      // TO-DO: create editUser function
      // editUser(userFormData, params.id, userFormData.listID);
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
        <Flex
          justifyContent="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack
            minW="48%"
            maxH="312px"
            alignItems="center"
            justifyContent="center"
          >
            {/* set the User Pic */}
            <Image
              alt=""
              borderRadius="full"
              h="200px"
              w="200px"
              bg="gray.300"
              src={userData.providerData[0].photoURL || ''}
            />
          </Stack>
          <Stack justifyContent="end" minW="48%">
            <BaseLabeledInput label="Username">
              <StyledInput
                type="text"
                variant="flushed"
                name="username"
                placeholder="Choose a Username"
                // validation={formError?.estateName}
                value={userFormData.username}
                onChange={onChangeHandler}
                isDisabled={isDisabled}
              />
            </BaseLabeledInput>
            <BaseLabeledInput label="Email">
              <StyledInput
                type="text"
                variant="flushed"
                name="email"
                placeholder=""
                // validation={formError?.price}
                value={userFormData.email || ''}
                onChange={() => {}}
                isDisabled={true} // The email shouldn't be changed
              />
            </BaseLabeledInput>
            <BaseLabeledInput label="Phone Number">
              <StyledInput
                type="text"
                variant="flushed"
                name="location" // Change to phoneNumber
                placeholder="Set your phone nomber"
                // validation={formError?.location}
                value={userFormData.providerData[0].phoneNumber || ''}
                onChange={onChangeHandler}
                isDisabled={isDisabled}
              />
            </BaseLabeledInput>
          </Stack>
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
