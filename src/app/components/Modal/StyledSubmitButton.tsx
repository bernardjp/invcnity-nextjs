import { Button } from '@chakra-ui/react';
import React from 'react';

type Props = {
  loading: boolean;
  text: string;
};

function StyledSubmitButton(props: Props) {
  const { loading, text } = props;
  return (
    <Button
      backgroundColor="#49ad87"
      border="1px solid white"
      borderRadius={50}
      boxShadow="0px 4px 15px -5px #49ad87"
      color="white"
      mt={4}
      type="submit"
      width="100%"
      isLoading={loading}
      _hover={{
        backgroundColor: 'brand.darkTeal',
      }}
    >
      {text}
    </Button>
  );
}

export default StyledSubmitButton;
