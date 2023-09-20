import React, { useState } from 'react';
import { Box, Button, Stack, Text, VStack } from '@chakra-ui/react';
import StyledInput from '../StyledInput';
import {
  validateListForm,
  ListFormValidation,
  ListInfoType,
} from './utils/validation';
import RadioTypeTabs from './RadioInputs';
import FormImage from './FormImage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, runTransaction } from 'firebase/firestore';

const FORM_DEFAULT_VALUES: ListInfoType = {
  id: '',
  listName: '',
  type: 'apartment',
  roles: {},
};

function FormInputs(props: { closeModal: () => void }): React.ReactElement {
  const [listFormData, setListFormData] = useState(FORM_DEFAULT_VALUES);
  const [formError, setFormError] = useState<ListFormValidation | null>(null);
  const [userCredentials] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formValues = {
      ...listFormData,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setListFormData(formValues);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null); // Reset the validation errors.
    setLoading(true);

    const { listName, type } = listFormData;
    const userId = userCredentials?.uid;

    // Validates the states of the current user. Accessing the uid is key to create the list.
    if (!userId) return;

    // Validate the format of the data.
    const formValidation = validateListForm(listName, type);
    if (!formValidation.isValidated) {
      setFormError(formValidation);
      return;
    }

    // Add the new List to the List Collection and to the User ListSnippets.
    try {
      // Data to be added to the List Collection
      const newList: ListInfoType = {
        ...listFormData,
        roles: { [userId]: 'owner' },
      };
      const listDocRef = doc(collection(firestore, 'estate_lists'));

      await runTransaction(firestore, async (transaction) => {
        transaction.set(listDocRef, newList);

        const listSnippet: ListInfoType = {
          ...newList,
          id: listDocRef.id,
        };
        const userDocRef = doc(
          firestore,
          `users/${userId}/listSnippets`,
          listDocRef.id
        );

        transaction.set(userDocRef, listSnippet);
      });

      setLoading(false);
      setFormError(null);
      props.closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <FormImage type={listFormData.type} />

        <RadioTypeTabs
          defaultValue={FORM_DEFAULT_VALUES.type}
          setListFormData={setListFormData}
        />

        <VStack my={4}>
          <Text
            w="100%"
            color="gray.500"
            textAlign={{ base: 'center', sm: 'left' }}
          >
            Choose your VCNITY name:
          </Text>
          <Box w={{ base: '100%', sm: '90%' }}>
            <StyledInput
              type="text"
              name="listName"
              placeholder="VCNITY name"
              validation={formError?.listName}
              onChange={onChangeHandler}
            />
          </Box>
        </VStack>

        <Button
          backgroundColor="teal.500"
          borderRadius={50}
          color="white"
          mt={4}
          type="submit"
          width="100%"
          isLoading={loading}
          _hover={{
            backgroundColor: 'teal.400',
          }}
        >
          Create VCNITY
        </Button>
      </Stack>
    </form>
  );
}
export default FormInputs;
