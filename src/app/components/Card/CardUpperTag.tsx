import React from 'react';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import { Box, useStyleConfig } from '@chakra-ui/react';

type PropType = {
  text: string;
  variant: ThemeVariant;
};

function UpperTag(props: PropType): React.ReactElement {
  const { text, variant } = props;
  const styles = useStyleConfig('Tooltip', { variant });

  return (
    <Box
      boxShadow="1px 3px 3px 0px rgba(0,0,0,0.3)"
      fontSize="1rem"
      fontWeight="bold"
      padding="3px 8px"
      position="absolute"
      right="28px"
      top="-4px"
      zIndex="5"
      __css={styles}
    >
      {text}
    </Box>
  );
}

export default UpperTag;
