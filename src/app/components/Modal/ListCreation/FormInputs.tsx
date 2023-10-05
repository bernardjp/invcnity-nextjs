import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { ListFormInfo } from '@/firebase/customTypes';
import { createEstateList } from '@/firebase/firestoreUtils';
import { validateListForm, ListFormValidation } from './utils/validation';
import StyledInput from '../StyledInput';
import FormImage from './FormImage';
import RadioTypeTabs from './RadioInputs';
import StyledSubmitButton from '../StyledSubmitButton';
import BaseLabeledInput from '../BaseLabeledInput';

const FORM_DEFAULT_VALUES: ListFormInfo = {
  listName: '',
  type: 'apartment',
  roles: {},
};

function FormInputs(props: { closeModal: () => void }): React.ReactElement {
  const [userCredentials] = useAuthState(auth);
  const [listFormData, setListFormData] = useState(FORM_DEFAULT_VALUES);
  const [formError, setFormError] = useState<ListFormValidation | null>(null);
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

    // Add the new List to the List Collection and to the User's ListSnippets.
    try {
      const newList: ListFormInfo = {
        ...listFormData,
        roles: { [userId]: 'owner' },
      };
      createEstateList(newList, userId);
      setFormError(null);
      props.closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
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
    </form>
  );
}
export default FormInputs;
