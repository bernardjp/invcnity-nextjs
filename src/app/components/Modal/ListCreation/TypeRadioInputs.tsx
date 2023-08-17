import React from 'react';
import {
  Box,
  Stack,
  Text,
  VStack,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { ListType, ListInfoType } from './utils/validation';

type RadioTypeTabsProps = {
  defaultValue: ListType;
  setListFormData: (value: React.SetStateAction<ListInfoType>) => void;
};

const RADIO_TYPE_OPTIONS = ['apartment', 'house', 'countryside', 'vacation'];

function RadioInputTab(props: any): React.ReactElement {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" textAlign="center">
      <input {...input} />
      <Box
        {...checkbox}
        style={{ textTransform: 'capitalize' }}
        cursor="pointer"
        borderBottom="3px solid transparent"
        fontSize={17}
        lineHeight="8"
        transition="0.3s"
        _hover={{
          borderBottom: '3px solid orange',
        }}
        _checked={{
          borderBottom: '3px solid orange',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function RadioTypeTabs(props: RadioTypeTabsProps): React.ReactElement {
  const { defaultValue, setListFormData } = props;

  const onChange = (value: ListType) => {
    setListFormData((prev) => ({ ...prev, type: value }));
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'type',
    defaultValue,
    onChange,
  });
  const group = getRootProps();

  return (
    <VStack mb={2}>
      <Text w="100%" color="gray.500">
        Pick a VCNITY type:
      </Text>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
        w="90%"
        {...group}
      >
        {RADIO_TYPE_OPTIONS.map((type) => {
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
