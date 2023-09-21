import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Button, Stack, Text, VStack } from '@chakra-ui/react';
import StyledInput from '../StyledInput';
import {
  validateEstateForm,
  EstateFormValidation,
  EstateInfoType,
} from './utils/validation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, runTransaction } from 'firebase/firestore';

const FORM_DEFAULT_VALUES: EstateInfoType = {
  id: '',
  estateName: '',
  price: '',
  location: '',
  locationURL: '',
  publicationURL: '',
};

function FormInputs(props: { closeModal: () => void }): React.ReactElement {
  const params = useParams();
  const [estateFormData, setEstateFormData] =
    useState<EstateInfoType>(FORM_DEFAULT_VALUES);
  const [formError, setFormError] = useState<EstateFormValidation | null>(null);
  const [userCredentials] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formValues = {
      ...estateFormData,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setEstateFormData(formValues);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null); // Reset the validation errors.
    setLoading(true);

    const userId = userCredentials?.uid;

    // Validates the states of the current user. Accessing the uid is key to create the estate.
    if (!userId) return;

    // Validate the format of the data.
    const formValidation = validateEstateForm(estateFormData);
    if (!formValidation.isValidated) {
      setFormError(formValidation);
      return;
    }

    // Add the new Estate to the Estates Collection and to the Estate-List EstateSnippets.
    try {
      const estateDocRef = doc(collection(firestore, 'estates'));

      await runTransaction(firestore, async (transaction) => {
        transaction.set(estateDocRef, estateFormData);

        const estateSnippet: EstateInfoType = {
          ...estateFormData,
          id: estateDocRef.id,
        };
        const listDocRef = doc(
          firestore,
          `estate_lists/${params.id}/estateSnippets`,
          estateDocRef.id
        );

        transaction.set(listDocRef, estateSnippet);
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
        <VStack mt={4} mb={2}>
          <Text
            w="100%"
            color="gray.500"
            textAlign={{ base: 'center', sm: 'left' }}
          >
            Pick a name:
          </Text>
          <Box w={{ base: '100%', sm: '90%' }}>
            <StyledInput
              variant="flushed"
              type="text"
              name="estateName"
              placeholder="ESTATE name"
              validation={formError?.estateName}
              onChange={onChangeHandler}
            />
          </Box>
        </VStack>

        <VStack mb={2}>
          <Text
            w="100%"
            color="gray.500"
            textAlign={{ base: 'center', sm: 'left' }}
          >
            Price:
          </Text>
          <Box w={{ base: '100%', sm: '90%' }}>
            <StyledInput
              variant="flushed"
              type="number"
              name="price"
              placeholder="U$ 115.000"
              validation={formError?.price}
              onChange={onChangeHandler}
            />
          </Box>
        </VStack>

        <VStack mb={2}>
          <Text
            w="100%"
            color="gray.500"
            textAlign={{ base: 'center', sm: 'left' }}
          >
            Location:
          </Text>
          <Box w={{ base: '100%', sm: '90%' }}>
            <StyledInput
              variant="flushed"
              type="text"
              name="location"
              placeholder="Brandsen"
              validation={formError?.location}
              onChange={onChangeHandler}
            />
          </Box>
        </VStack>

        <VStack mb={2}>
          <Text
            w="100%"
            color="gray.500"
            textAlign={{ base: 'center', sm: 'left' }}
          >
            Publication URL:
          </Text>
          <Box w={{ base: '100%', sm: '90%' }}>
            <StyledInput
              variant="flushed"
              type="text"
              name="publicationURL"
              placeholder="https://www.mercadolibre.com.ar"
              validation={formError?.publicationURL}
              onChange={onChangeHandler}
            />
          </Box>
        </VStack>

        <VStack mb={2}>
          <Text
            w="100%"
            color="gray.500"
            textAlign={{ base: 'center', sm: 'left' }}
          >
            Location URL:
          </Text>
          <Box w={{ base: '100%', sm: '90%' }}>
            <StyledInput
              variant="flushed"
              type="text"
              name="locationURL"
              placeholder="https://www.google.com/maps"
              validation={formError?.locationURL}
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
          Create ESTATE
        </Button>
      </Stack>
    </form>
  );
}
export default FormInputs;
