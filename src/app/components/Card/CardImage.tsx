import React from 'react';
import { Image, useStyleConfig } from '@chakra-ui/react';
import { ListType } from '../Modal/ListCreation/utils/validation';

type PropType = {
  type: ListType;
  variant: ListType;
};

function CardImage(props: PropType): React.ReactElement {
  const { type, variant } = props;
  const styles = useStyleConfig('CardImage', { variant });

  return <Image src={`/images/select-${type}.svg`} alt="" __css={styles} />;
}

export default CardImage;
