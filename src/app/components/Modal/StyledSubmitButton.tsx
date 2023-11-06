import { Button } from '@chakra-ui/react';
import React from 'react';

type Props = {
  loading: boolean;
  type: 'submit' | 'reset';
  text: string;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function StyledSubmitButton(props: Props) {
  const { loading, text, type, onClickHandler } = props;
  return (
    <Button
      backgroundColor={type === 'reset' ? 'white' : '#49ad87'}
      border={`1px solid ${type === 'reset' ? '#49ad87' : 'white'}`}
      borderRadius={50}
      boxShadow="0px 4px 15px -5px #49ad87"
      color={type === 'reset' ? '#49ad87' : 'white'}
      mt={4}
      transition="0.2s"
      type={type}
      width="100%"
      isLoading={loading}
      onClick={onClickHandler}
      _hover={{
        backgroundColor: 'brand.darkTeal',
        color: 'white',
      }}
    >
      {text}
    </Button>
  );
}

export default StyledSubmitButton;
