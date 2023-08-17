import React from 'react';
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { AuthValidation } from './Auth/utils/validation';

type InputProps = {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type AuthInputProps = InputProps & {
  name: 'email' | 'username' | 'password' | 'confirmPassword';
  validation: AuthValidation | undefined;
};

export type ListInputProps = InputProps & {
  name: 'listName' | 'type' | 'owner';
  validation: AuthValidation | undefined;
};

type StyledInputProps = AuthInputProps | ListInputProps;

const StyledInput: React.FC<StyledInputProps> = (props: StyledInputProps) => {
  const { type, name, placeholder, validation, onChange } = props;

  return (
    <FormControl isInvalid={validation?.isValidated === false}>
      <Input
        backgroundColor="gray.50"
        name={name}
        pr={type === 'password' ? '3rem' : ''}
        type={type}
        placeholder={placeholder}
        variant={name === 'listName' ? 'flushed' : 'outline'}
        _placeholder={{ color: 'gray.700' }}
        _hover={{
          border: name === 'listName' ? '' : '1px solid',
          borderColor: 'teal.400',
        }}
        _focus={{
          bg: 'white',
          outline: 'none',
          border: name === 'listName' ? '' : '1px solid',
          borderColor: 'teal.400',
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
