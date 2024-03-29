import { useState } from 'react';
import { Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import StyledInput from '../StyledInput';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import { InputValidation } from '../StyledInput';

type PasswordInputProps = {
  name: 'password' | 'confirmPassword';
  placeholder: string;
  validation: InputValidation | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PasswordInput(props: PasswordInputProps): React.ReactElement {
  const { name, placeholder, validation, onChange } = props;

  const { modalState } = useAuthModal();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <StyledInput
        variant="outline"
        type={show ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        validation={validation}
        onChange={onChange}
      />
      {modalState.view === 'login' && (
        <InputRightElement width="3rem">
          <Button
            border="none"
            h="1.75rem"
            size="md"
            variant="ghost"
            padding={0}
            onClick={handleClick}
          >
            {show ? (
              <ViewOffIcon boxSize={5} color="gray.400" />
            ) : (
              <ViewIcon boxSize={5} color="gray.400" />
            )}
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
}

export default PasswordInput;
