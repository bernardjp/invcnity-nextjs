import React from 'react';
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { AuthValidation } from './utils/validation';

type StyledInputProps = {
  type: 'text' | 'email' | 'password';
  name: 'email' | 'username' | 'password' | 'confirmPassword';
  placeholder: string;
  validation?: AuthValidation;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

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
        _placeholder={{ color: 'gray.700' }}
        _hover={{
          border: '1px solid',
          borderColor: 'blue.400',
        }}
        _focus={{
          bg: 'white',
          outline: 'none',
          border: '1px solid',
          borderColor: 'blue.400',
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
