import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import StarRatingInput from './StarRatingInput';

type Props = {};

function StarRatingSlider({}: Props) {
  const RATING_SCORE = 5;
  const DEFAULT_RATING = 1;

  const [value, setValue] = useState(DEFAULT_RATING);
  const [hoverValue, setHoverValue] = useState(DEFAULT_RATING);

  return (
    <Flex alignItems="center" onMouseOut={() => setHoverValue(value)}>
      {/** Star Rating CONTAINER */}
      <Flex>
        {/** Reset Star Rating */}
        <Flex h="2rem" justifyContent="center" w="1rem" zIndex={2}>
          <Box
            w="100%"
            cursor="pointer"
            onClick={() => setValue(0)}
            onMouseOver={() => setHoverValue(0)}
          ></Box>
        </Flex>

        {/** Stars */}
        {Array.from(Array(RATING_SCORE).keys()).map((i) => {
          return (
            <StarRatingInput
              key={i}
              min={i + 0.5}
              max={i + 1}
              hoverValue={hoverValue}
              onClick={setValue}
              onHover={setHoverValue}
            />
          );
        })}
      </Flex>

      <Text ml={4}>{hoverValue} rating</Text>
    </Flex>
  );
}

export default StarRatingSlider;
