import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/firebase/clientApp';
import { ListFormInfo, ListType } from '@/firebase/customTypes';
import { createEstateList, editEstateList } from '@/firebase/firestoreUtils';
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
  id: '',
};

type Props = {
  action: 'create' | 'edit';
  defaultValues?: ListFormInfo;
  closeModal: () => void;
};

function FormInputs(props: Props): React.ReactElement {
  const { closeModal, defaultValues, action } = props;
  const listID = useParams().id?.split('_')[1] || '';

  const [userCredentials] = useAuthState(auth);
  const [listFormData, setFormData] = useState(
    defaultValues || FORM_DEFAULT_VALUES
  );

  const [formError, setFormError] = useState<ListFormValidation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formValues = {
      ...listFormData,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setFormData(formValues);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null); // Reset the validation errors.
    setLoading(true);

    const { listName, type } = listFormData;
    const userID = userCredentials?.uid;

    // Validates the states of the current user. Accessing the uid is key to create the list.
    if (!userID) return;

    // Validate the format of the data.
    const formValidation = validateListForm(listName, type);
    if (!formValidation.isValidated) {
      setFormError(formValidation);
      return;
    }

    // Add (or edit) the new List to the List Collection and to the User's ListSnippets.
    try {
      if (action === 'create') {
        const newList: ListFormInfo = {
          ...listFormData,
          roles: { [userID]: 'owner' },
        };
        createEstateList(newList, userID);
      }

      if (action === 'edit') {
        editEstateList(listFormData, listID, userID);
      }

      setFormError(null);
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const radioInputsHandler = (value: ListType) => {
    setFormData((prev: ListFormInfo) => ({ ...prev, type: value }));
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <FormImage type={listFormData.type} />
      <RadioTypeTabs
        defaultValue={listFormData.type}
        onChangeHandler={radioInputsHandler}
      />
      <BaseLabeledInput label="Choose your VCNITY name:">
        <StyledInput
          variant="flushed"
          type="text"
          name="listName"
          placeholder="VCNITY name"
          validation={formError?.listName}
          onChange={onChangeHandler}
          value={listFormData.listName}
        />
      </BaseLabeledInput>
      <StyledSubmitButton
        loading={loading}
        text={defaultValues ? 'Update' : 'Create'}
        type="submit"
      />
    </form>
  );
}
export default FormInputs;
