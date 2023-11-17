import React from 'react';
import { Flex, Box, Image } from '@chakra-ui/react';

type Props = {
  min: number;
  max: number;
  hoverValue: number;
  onHover: React.Dispatch<React.SetStateAction<number>>;
  onClick: React.Dispatch<React.SetStateAction<number>>;
};

function StarRatingInput(props: Props) {
  const { min, max, hoverValue, onHover, onClick } = props;

  return (
    <Flex position="relative">
      <Flex w="2rem" h="2rem" position="absolute" zIndex={1}>
        {hoverValue < min && <Image src={`/icons/star-empty.svg`} alt="" />}
        {hoverValue === min && <Image src={`/icons/star-half.svg`} alt="" />}
        {hoverValue >= max && <Image src={`/icons/star-full.svg`} alt="" />}
      </Flex>
      <Flex h="2rem" justifyContent="center" w="2rem" zIndex={2}>
        <Box
          w="1rem"
          cursor="pointer"
          onClick={() => onClick(min)}
          onMouseOver={() => onHover(min)}
        ></Box>
        <Box
          w="1rem"
          cursor="pointer"
          onClick={() => onClick(max)}
          onMouseOver={() => onHover(max)}
        ></Box>
      </Flex>
    </Flex>
  );
}

export default StarRatingInput;
