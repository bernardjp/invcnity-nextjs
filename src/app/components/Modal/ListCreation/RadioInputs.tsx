import React from 'react';
import {
  Flex,
  Box,
  Stack,
  Text,
  VStack,
  useRadio,
  useRadioGroup,
  useStyleConfig,
} from '@chakra-ui/react';
import { ListType } from '@/firebase/customTypes';
import { listVariant } from '@/style/componentsStyleConfig';

type RadioTypeTabsProps = {
  defaultValue: ListType;
  isDisabled?: boolean;
  onChangeHandler: (value: ListType) => void;
};

const RADIO_TYPE_OPTIONS: ListType[] = [
  'apartment',
  'house',
  'countryside',
  'vacation',
];

function RadioInputTab(props: any): React.ReactElement {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  const variant = listVariant[props.children as ListType];
  const styles = useStyleConfig('VariantCheckbox', { variant });

  return (
    <Box as="label" textAlign="center" width={{ base: 'fit-content' }}>
      <input {...input} />
      <Flex {...checkbox} textTransform="capitalize" __css={styles}>
        {props.children}
      </Flex>
    </Box>
  );
}

function RadioTypeTabs(props: RadioTypeTabsProps): React.ReactElement {
  const { defaultValue, isDisabled, onChangeHandler } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'type',
    defaultValue,
    onChange: onChangeHandler,
  });
  const group = getRootProps();

  return (
    <VStack my={2}>
      <Text
        w="100%"
        color="gray.500"
        textAlign={{ base: 'center', sm: 'left' }}
      >
        VCNITY type:
      </Text>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        w="90%"
        {...group}
      >
        {isDisabled && (
          <Flex
            borderBottom="3px solid"
            borderColor="transparent"
            lineHeight={8}
            textTransform="capitalize"
          >
            {defaultValue}
          </Flex>
        )}
        {!isDisabled &&
          RADIO_TYPE_OPTIONS.map((type) => {
            const radio = getRadioProps({ value: type });

            return (
              <RadioInputTab key={type} {...radio}>
                {type}
              </RadioInputTab>
            );
          })}
      </Stack>
    </VStack>
  );
}

export default RadioTypeTabs;
