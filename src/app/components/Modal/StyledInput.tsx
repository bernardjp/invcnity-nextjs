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
        name={name}
        pr={type === 'password' ? '3rem' : ''}
        type={type}
        placeholder={placeholder}
        variant={name === 'listName' ? 'flushed' : 'outline'}
        borderBottom="1px solid"
        borderColor="gray.400"
        _placeholder={{ color: 'gray.700' }}
        _hover={{
          border: name === 'listName' ? '' : '2px solid',
          borderColor: 'orange',
        }}
        _focus={{
          outline: 'none',
          border: name === 'listName' ? '' : '2px solid',
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
