import React from 'react';
import { FormControl, Input } from '@chakra-ui/react';

type StyledInputProps = {
  type: 'text' | 'password';
  name: 'email' | 'username' | 'password' | 'confirmPassword';
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledInput: React.FC<StyledInputProps> = (props: StyledInputProps) => {
  const { type, name, placeholder, onChange } = props;

  return (
    <FormControl isRequired>
      <Input
        pr={type === 'password' ? '3rem' : ''}
        type={type}
        name={name}
        backgroundColor="gray.50"
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
    </FormControl>
  );
};
export default StyledInput;
