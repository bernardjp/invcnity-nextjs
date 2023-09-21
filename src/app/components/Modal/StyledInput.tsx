import React from 'react';
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';

type InputProps = {
  type: 'text' | 'email' | 'password' | 'number';
  variant: 'flushed' | 'outline';
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type InputValidation = {
  errorMessage: string;
  isValidated: boolean;
};

export type AuthInputProps = InputProps & {
  name: 'email' | 'username' | 'password' | 'confirmPassword';
  validation?: InputValidation;
};

export type ListInputProps = InputProps & {
  name: 'listName' | 'type' | 'owner';
  validation?: InputValidation;
};

export type EstateInputProps = InputProps & {
  name: 'estateName' | 'price' | 'location' | 'locationURL' | 'publicationURL';
  validation?: InputValidation;
};

type StyledInputProps = AuthInputProps | ListInputProps | EstateInputProps;

const StyledInput: React.FC<StyledInputProps> = (props: StyledInputProps) => {
  const { type, variant, name, placeholder, validation, onChange } = props;

  return (
    <FormControl isInvalid={validation?.isValidated === false}>
      <Input
        name={name}
        pr={type === 'password' ? '3rem' : ''}
        type={type}
        placeholder={placeholder}
        variant={variant}
        borderBottom="1px solid"
        borderColor="gray.400"
        _placeholder={{ color: 'gray.700' }}
        _hover={{
          border: variant === 'flushed' ? '' : '2px solid',
          borderColor: 'orange',
        }}
        _focus={{
          outline: 'none',
          border: variant === 'flushed' ? '' : '2px solid',
          borderColor: 'orange',
        }}
        _focusVisible={{
          borderBottom: '2px solid',
          borderColor: 'orange',
        }}
        onChange={onChange}
      />
      {!validation?.isValidated && (
        <FormErrorMessage>{validation?.errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};
export default StyledInput;
