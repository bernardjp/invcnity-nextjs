import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Stack } from '@chakra-ui/react';
import StyledInput from '../StyledInput';
import {
  validateEstateForm,
  EstateFormValidation,
  EstateInfoType,
} from './utils/validation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, runTransaction } from 'firebase/firestore';
import { ListType } from '@/firebase/customTypes';
import FormImage from '../ListCreation/FormImage';
import BaseLabeledInput from '../BaseLabeledInput';
import StyledSubmitButton from '../StyledSubmitButton';

const FORM_DEFAULT_VALUES: EstateInfoType = {
  id: '',
  estateName: '',
  price: '',
  location: '',
  locationURL: '',
  publicationURL: '',
  type: 'house',
};

function FormInputs(props: { closeModal: () => void }): React.ReactElement {
  const [type, id] = useParams().id.split('_');

  const [estateFormData, setEstateFormData] = useState<EstateInfoType>({
    ...FORM_DEFAULT_VALUES,
    type: type as ListType,
  });
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
      const newEstate = {
        ...estateFormData,
        roles: { [userId]: 'owner' },
      };
      const estateDocRef = doc(collection(firestore, 'estates'));

      await runTransaction(firestore, async (transaction) => {
        transaction.set(estateDocRef, newEstate);

        const estateSnippet: EstateInfoType = {
          ...newEstate,
          id: estateDocRef.id,
        };
        const listDocRef = doc(
          firestore,
          `estate_lists/${id}/estateSnippets`,
          estateDocRef.id
        );

        transaction.set(listDocRef, estateSnippet);
      });

      setFormError(null);
      props.closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <FormImage type={type as ListType} />

        <BaseLabeledInput label="Choose a name:">
          <StyledInput
            variant="flushed"
            type="text"
            name="estateName"
            placeholder="ESTATE name"
            validation={formError?.estateName}
            onChange={onChangeHandler}
          />
        </BaseLabeledInput>
        <BaseLabeledInput label="Price:">
          <StyledInput
            variant="flushed"
            type="number"
            name="price"
            placeholder="U$ 115.000"
            validation={formError?.price}
            onChange={onChangeHandler}
          />
        </BaseLabeledInput>
        <BaseLabeledInput label="Location:">
          <StyledInput
            variant="flushed"
            type="text"
            name="location"
            placeholder="Brandsen"
            validation={formError?.location}
            onChange={onChangeHandler}
          />
        </BaseLabeledInput>
        <BaseLabeledInput label="Publication URL:">
          <StyledInput
            variant="flushed"
            type="text"
            name="publicationURL"
            placeholder="https://www.mercadolibre.com.ar"
            validation={formError?.publicationURL}
            onChange={onChangeHandler}
          />
        </BaseLabeledInput>
        <BaseLabeledInput label="Location URL:">
          <StyledInput
            variant="flushed"
            type="text"
            name="locationURL"
            placeholder="https://www.google.com/maps"
            validation={formError?.locationURL}
            onChange={onChangeHandler}
          />
        </BaseLabeledInput>

        <StyledSubmitButton loading={loading} text="Create Estate" />
      </Stack>
    </form>
  );
}
export default FormInputs;
