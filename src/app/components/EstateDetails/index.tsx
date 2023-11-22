import React, { useState, useEffect } from 'react';
import { EstateDoc, EstateFormInfo, ListType } from '@/firebase/customTypes';
import { useDisableForm } from '@/app/hooks/useDisableForm';
import useFormAlert from '@/app/hooks/useFormAlert';
import { AlertState } from '@/recoil/FormAlertAtom';
import { Flex, Stack } from '@chakra-ui/react';
import StyledInput from '../Modal/StyledInput';
import BaseLabeledInput from '../Modal/BaseLabeledInput';
import StyledSubmitButton from '../Modal/StyledSubmitButton';
import FormImage from '../Modal/ListCreation/FormImage';
import RadioTypeTabs from '../Modal/ListCreation/RadioInputs';
import CardFavoriteIcon from '../Card/CardFavoriteIcon';
import CardAnchorIcon from '../Card/CardAnchorIcon';
import { listVariant } from '@/style/componentsStyleConfig';
import StarRatingSlider from '../StarRatingSlider';

function EstateDetails(props: { estateData: EstateDoc }) {
  const { estateData } = props;
  const [estateFormData, setFormData] = useState(estateData);
  const variant = listVariant[estateFormData.type];

  // See if this can be solved with a local context provider.
  const { isDisabled, toggleDisable } = useDisableForm();
  const { closeAlert, setAlertState } = useFormAlert();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Resets the form default values when the it is disabled.
    if (isDisabled) setFormData(estateData);
  }, [isDisabled, estateData]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Estate updated');
    toggleDisable(); // close the "edition mode".
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
      <form style={{ width: '100%' }} onSubmit={onSubmitHandler}>
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
                validation={{ isValidated: true, errorMessage: '' }}
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
                validation={{ isValidated: true, errorMessage: '' }}
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
                validation={{ isValidated: true, errorMessage: '' }}
                value={estateFormData.location}
                onChange={onChangeHandler}
                isDisabled={isDisabled}
              />
            </BaseLabeledInput>
            <BaseLabeledInput label="Rating">
              <StarRatingSlider
                value={estateFormData.rating}
                onChange={onChangeHandler}
                isDisabled={isDisabled}
              />
            </BaseLabeledInput>
          </Stack>
        </Flex>
        <BaseLabeledInput label="Ubication">
          <StyledInput
            type="text"
            variant="flushed"
            name="locationURL"
            placeholder="Link to the Estate's ubication"
            validation={{ isValidated: true, errorMessage: '' }}
            value={estateFormData.locationURL}
            onChange={onChangeHandler}
            isDisabled={isDisabled}
          />
        </BaseLabeledInput>
        <BaseLabeledInput label="Publication">
          <StyledInput
            type="text"
            variant="flushed"
            name="publicationURL"
            placeholder="Link to the Estate's publication"
            validation={{ isValidated: true, errorMessage: '' }}
            value={estateFormData.publicationURL}
            onChange={onChangeHandler}
            isDisabled={isDisabled}
          />
        </BaseLabeledInput>

        {/* set to a select o a radio input */}
        <BaseLabeledInput label="Visited?">
          <StyledInput
            type="text"
            variant="flushed"
            name="publicationURL" // --> Change to isVisited
            placeholder="Have you visited the Estate?"
            validation={{ isValidated: true, errorMessage: '' }}
            value={String(estateFormData.isVisited)}
            onChange={onChangeHandler}
            isDisabled={isDisabled}
          />
        </BaseLabeledInput>
        {/* set to a select o a radio input */}

        {!isDisabled && (
          <Flex gap={5} mt={6}>
            <StyledSubmitButton
              type={'reset'}
              loading={loading}
              text="Reset Estate"
              onClickHandler={onResetHandler}
            />
            <StyledSubmitButton
              type={'submit'}
              loading={loading}
              text="Update Estate"
            />
          </Flex>
        )}
      </form>
    </Flex>
  );
}

export default EstateDetails;
