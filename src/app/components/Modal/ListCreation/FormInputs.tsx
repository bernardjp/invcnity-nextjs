import React, { useState } from 'react';
import { Stack } from '@chakra-ui/react';
import StyledInput from '../StyledInput';
import { validateListForm, ListFormValidation } from './utils/validation';
import RadioTypeTabs from './RadioInputs';
import FormImage from './FormImage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, runTransaction } from 'firebase/firestore';
import { ListInfoType } from '@/firebase/customTypes';
import StyledSubmitButton from '../StyledSubmitButton';
import BaseLabeledInput from '../BaseLabeledInput';

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

      setFormError(null);
      props.closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

        <BaseLabeledInput label="Choose your VCNITY name:">
          <StyledInput
            variant="flushed"
            type="text"
            name="listName"
            placeholder="VCNITY name"
            validation={formError?.listName}
            onChange={onChangeHandler}
          />
        </BaseLabeledInput>

        <StyledSubmitButton loading={loading} text="Create VCNITY" />
      </Stack>
    </form>
  );
}
export default FormInputs;
