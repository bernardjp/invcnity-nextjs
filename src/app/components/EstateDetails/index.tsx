import React, { useState, useEffect } from 'react';
import { Flex, Stack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { EstateDoc, EstateFormInfo, ListType } from '@/firebase/customTypes';
import { editEstate } from '@/firebase/firestoreUtils';
import { auth } from '@/firebase/clientApp';
import { useDisableForm } from '@/app/hooks/useDisableForm';
import useFormAlert from '@/app/hooks/useFormAlert';
import { AlertState } from '@/recoil/FormAlertAtom';
import { listVariant } from '@/style/componentsStyleConfig';
import StyledInput from '../Modal/StyledInput';
import BaseLabeledInput from '../Modal/BaseLabeledInput';
import StyledSubmitButton from '../Modal/StyledSubmitButton';
import FormImage from '../Modal/ListCreation/FormImage';
import RadioTypeTabs from '../Modal/ListCreation/RadioInputs';
import VisitedRadioInput from '../Modal/EstateCreation/VisitedRadioInput';
import {
  EstateFormValidation,
  validateEstateForm,
} from '../Modal/EstateCreation/utils/validation';
import CardFavoriteIcon from '../Card/CardFavoriteIcon';
import CardAnchorIcon from '../Card/CardAnchorIcon';
import StarRatingSlider from '../StarRatingSlider';

function EstateDetails(props: { estateData: EstateDoc }) {
  const { estateData } = props;
  const estateID = useParams().id.split('_')[1];
  const [userCredentials] = useAuthState(auth);

  const [estateFormData, setFormData] = useState(estateData);
  const variant = listVariant[estateFormData.type];

  // See if this can be solved with a local context provider.
  const { closeAlert, setAlertState } = useFormAlert();

  // Form state
  const { isDisabled, toggleDisable } = useDisableForm();
  const [formError, setFormError] = useState<EstateFormValidation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Resets the form to its default values when it's disabled.
  useEffect(() => {
    if (isDisabled) setFormData(estateData);
  }, [isDisabled, estateData]);

  const onSubmitHandler = () => {
    setFormError(null); // Reset the validation errors.
    setLoading(true);

    // Validates the states of the current user. Accessing the uid is key to create the estate.
    const userId = userCredentials?.uid;
    if (!userId) return;

    // Validate the format of the data.
    const formValidation = validateEstateForm(estateFormData);
    if (!formValidation.isValidated) {
      setFormError(formValidation);
      return;
    }

    //Edit the Estate in the Estates Collection and in the Estate-List EstateSnippets.
    try {
      editEstate(estateFormData, estateID, estateFormData.listID);
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
        setFormData(estateData);
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

  const radioInputsHandler = (value: ListType) => {
    setFormData((prev: EstateFormInfo) => ({ ...prev, type: value }));
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
      <Flex position="absolute" gap={1}>
        <CardFavoriteIcon
          variant={variant}
          isFavorite={estateFormData.isFavorite}
        />
        {estateFormData.publicationURL && (
          <CardAnchorIcon
            label="Go to PUBLICATION"
            variant={variant}
            type="publication"
            pageURL={estateFormData.publicationURL}
          />
        )}
        {estateFormData.locationURL && (
          <CardAnchorIcon
            label="Go to LOCATION"
            variant={variant}
            type="location"
            pageURL={estateFormData.locationURL}
          />
        )}
      </Flex>
      <form style={{ width: '100%' }}>
        <Flex
          justifyContent="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack minW="48%" maxH="312px">
            <FormImage type={estateFormData.type} />
            <RadioTypeTabs
              defaultValue={estateFormData.type}
              isDisabled={isDisabled}
              onChangeHandler={radioInputsHandler}
            />
          </Stack>
          <Stack justifyContent="end" minW="48%">
            <BaseLabeledInput label="Estate Name">
              <StyledInput
                type="text"
                variant="flushed"
                name="estateName"
                placeholder="Choose a name for the Estate"
                validation={formError?.estateName}
                value={estateFormData.estateName}
                onChange={onChangeHandler}
                isDisabled={isDisabled}
              />
            </BaseLabeledInput>
            <BaseLabeledInput label="Price">
              <StyledInput
                type="number"
                variant="flushed"
                name="price"
                placeholder="0.00"
                validation={formError?.price}
                value={estateFormData.price}
                onChange={onChangeHandler}
                isDisabled={isDisabled}
              />
            </BaseLabeledInput>
            <BaseLabeledInput label="Location">
              <StyledInput
                type="text"
                variant="flushed"
                name="location"
                placeholder="Set the location (city or state)"
                validation={formError?.location}
                value={estateFormData.location}
                onChange={onChangeHandler}
                isDisabled={isDisabled}
              />
            </BaseLabeledInput>

            <Flex direction={{ base: 'column', lg: 'row' }}>
              <BaseLabeledInput label="Rating">
                <StarRatingSlider
                  value={estateFormData.rating}
                  onChange={onChangeHandler}
                  isDisabled={isDisabled}
                />
              </BaseLabeledInput>
              <BaseLabeledInput label="Visited?">
                <VisitedRadioInput
                  value={Boolean(estateFormData.isVisited)}
                  variant={variant}
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      isVisited: val === 'true',
                    }))
                  }
                  isDisabled={isDisabled}
                />
              </BaseLabeledInput>
            </Flex>
          </Stack>
        </Flex>

        <Flex
          justifyContent="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex width={{ base: '100%', md: '48%' }}>
            <BaseLabeledInput label="Ubication">
              <StyledInput
                type="text"
                variant="flushed"
                name="locationURL"
                placeholder="Link to the Estate's ubication"
                validation={formError?.locationURL}
                value={estateFormData.locationURL}
                onChange={onChangeHandler}
                isDisabled={isDisabled}
              />
            </BaseLabeledInput>
          </Flex>
          <Flex width={{ base: '100%', md: '48%' }}>
            <BaseLabeledInput label="Publication">
              <StyledInput
                type="text"
                variant="flushed"
                name="publicationURL"
                placeholder="Link to the Estate's publication"
                validation={formError?.publicationURL}
                value={estateFormData.publicationURL}
                onChange={onChangeHandler}
                isDisabled={isDisabled}
              />
            </BaseLabeledInput>
          </Flex>
        </Flex>

        {!isDisabled && (
          <Flex gap={5} mt={6}>
            <StyledSubmitButton
              loading={loading}
              type={'reset'}
              text="Reset Estate"
              onClickHandler={onResetHandler}
            />
            <StyledSubmitButton
              loading={loading}
              type={'submit'}
              text="Update Estate"
              onClickHandler={onSubmitHandler}
            />
          </Flex>
        )}
      </form>
    </Flex>
  );
}

export default EstateDetails;
