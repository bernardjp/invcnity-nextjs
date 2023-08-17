import React, { useState } from 'react';
import { Box, Button, Image, Stack, Text, VStack } from '@chakra-ui/react';
import StyledInput from '../StyledInput';
import {
  validateListForm,
  ListFormValidation,
  ListInfoType,
} from './utils/validation';
import RadioTypeTabs from './TypeRadioInputs';
// import { FIREBASE_ERRORS } from '@/firebase/errors';
//import { updateProfile } from 'firebase/auth';

const FORM_DEFAULT_VALUES: ListInfoType = {
  listName: '',
  type: 'apartment',
};

function FormInputs(): React.ReactElement {
  const [listFormData, setListFormData] = useState(FORM_DEFAULT_VALUES);
  const [formError, setFormError] = useState<ListFormValidation | null>(null);

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

    const { listName, type } = listFormData;

    // Validate the format of the data.
    const formValidation = validateListForm(listName, type);
    if (!formValidation.isValidated) {
      setFormError(formValidation);
      return;
    }

    console.log('form is valid:', formValidation.isValidated);

    // Add the new List to the List Collection and to the User ListSnippets.
    try {
      /* FIREBASE LOGIC */
      setFormError(null);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(listFormData);

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <Image
          height="20rem"
          src={`/images/select-${listFormData.type}.svg`}
          alt={`${listFormData.type} illustration`}
        />

        <RadioTypeTabs
          defaultValue={FORM_DEFAULT_VALUES.type}
          setListFormData={setListFormData}
        />

        <VStack my={4}>
          <Text w="100%" color="gray.500">
            Choose your VCNITY name:
          </Text>
          <Box w="90%">
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
          mt={4}
          // isLoading={loading}
          borderRadius={50}
          color="white"
          backgroundColor="teal.500"
          type="submit"
          width="100%"
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
