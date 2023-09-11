import React from 'react';
import { Flex, Image, useStyleConfig } from '@chakra-ui/react';
import { ListType } from './utils/validation';

function FormImage(props: { type: ListType }): React.ReactElement {
  const { type } = props;
  const styles = useStyleConfig('FormImage', {
    variant: type,
  });

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      height={{ base: '10rem', sm: '15rem' }}
      width="100%"
      overflow="hidden"
    >
      <Image
        src={`/images/select-${type}.svg`}
        alt={`${type} illustration`}
        minWidth={{ base: '15rem', sm: '22rem' }}
        __css={styles}
      />
    </Flex>
  );
}

export default FormImage;
