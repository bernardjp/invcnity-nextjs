import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { createEstate, editEstate } from '@/firebase/firestoreUtils';
import { EstateFormInfo, ParamData } from '@/firebase/customTypes';
import { validateEstateForm, EstateFormValidation } from './utils/validation';
import StyledInput from '../StyledInput';
import FormImage from '../ListCreation/FormImage';
import BaseLabeledInput from '../BaseLabeledInput';
import StyledSubmitButton from '../StyledSubmitButton';

const FORM_DEFAULT_VALUES: EstateFormInfo = {
  estateName: '',
  price: '',
  location: '',
  locationURL: '',
  publicationURL: '',
  type: 'house',
  listData: {
    id: '',
    name: '',
    type: 'house',
  },
  id: '',
};

type Props = {
  action: 'create' | 'edit';
  defaultValues?: EstateFormInfo;
  listData: ParamData;
  closeModal: () => void;
};

function FormInputs(props: Props): React.ReactElement {
  const { closeModal, action, defaultValues, listData } = props;
  const [userCredentials] = useAuthState(auth);
  const [estateFormData, setEstateFormData] = useState<EstateFormInfo>(
    defaultValues || {
      ...FORM_DEFAULT_VALUES,
      type: listData.type,
      listData,
    }
  );

  const [formError, setFormError] = useState<EstateFormValidation | null>(null);
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
      if (action === 'create') {
        const newEstate: EstateFormInfo = {
          ...estateFormData,
          roles: { [userId]: 'owner' },
        };
        createEstate(newEstate);
      }

      if (action === 'edit') {
        // the variable 'id' in the execution context points to the estateID because the edit action is only available inside 'propiedades/[id]' route, so 'id' in this case references the estate and not the estate_list.
        editEstate(
          estateFormData,
          estateFormData.id,
          estateFormData.listData.id
        );
      }

      setFormError(null);
      closeModal();
    } catch (error) {
      setLoading(false);
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
      <FormImage type={listData.type} />
      <BaseLabeledInput label="Choose a name:">
        <StyledInput
          variant="flushed"
          type="text"
          name="estateName"
          placeholder="ESTATE name"
          validation={formError?.estateName}
          onChange={onChangeHandler}
          value={estateFormData.estateName}
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
          value={estateFormData.price}
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
          value={estateFormData.location}
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
          value={estateFormData.publicationURL}
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
          value={estateFormData.locationURL}
        />
      </BaseLabeledInput>
      <StyledSubmitButton
        loading={loading}
        text="Create Estate"
        type="submit"
      />
    </form>
  );
}
export default FormInputs;
