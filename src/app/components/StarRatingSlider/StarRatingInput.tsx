import React from 'react';
import { Flex, Box, Image } from '@chakra-ui/react';

type Props = {
  min: number;
  max: number;
  hoverValue: number;
  isDisabled: boolean;
  onHover: (e: number) => void;
  onClick: (e: number) => void;
};

function StarRatingInput(props: Props) {
  const { min, max, hoverValue, isDisabled, onHover, onClick } = props;

  return (
    <Flex
      position="relative"
      cursor={isDisabled ? 'default' : 'pointer'}
      w="1.5rem"
      h="1.5rem"
    >
      <Flex w="inherit" h="inherit" position="absolute" zIndex={1}>
        {hoverValue < min && <Image src={`/icons/star-empty.svg`} alt="" />}
        {hoverValue === min && <Image src={`/icons/star-half.svg`} alt="" />}
        {hoverValue >= max && <Image src={`/icons/star-full.svg`} alt="" />}
      </Flex>
      <Flex w="inherit" h="inherit" justifyContent="center" zIndex={2}>
        <Box
          w="50%"
          onClick={() => onClick(min)}
          onMouseOver={() => onHover(min)}
        ></Box>
        <Box
          w="50%"
          onClick={() => onClick(max)}
          onMouseOver={() => onHover(max)}
        ></Box>
      </Flex>
    </Flex>
  );
}

export default StarRatingInput;
