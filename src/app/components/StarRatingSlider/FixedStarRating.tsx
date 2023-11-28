import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

type Props = {
  value: 'empty' | 'half' | 'full';
};

function FixedStarRating(props: Props) {
  const { value } = props;

  return (
    <Flex position="relative" cursor="default" w="1.1rem" h="1.1rem">
      <Flex w="inherit" h="inherit" position="absolute">
        <Image src={`/icons/star-${value}.svg`} alt="" />
      </Flex>
    </Flex>
  );
}

export default FixedStarRating;
