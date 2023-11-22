import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import StarRatingInput from './StarRatingInput';

type Props = {
  value?: string;
  isDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function triggerInputEvent(
  inputElement: null | HTMLInputElement,
  value: number
) {
  // Assigns the value to the input manually
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set;
  nativeInputValueSetter?.call(inputElement, value);

  // Creates the 'change' event and triggers it. In this case, the text/number input
  // triggers from the 'input' event.
  const event = new Event('input', { bubbles: true });
  inputElement!.dispatchEvent(event);
}

function StarRatingSlider(props: Props) {
  const { isDisabled, value, onChange } = props;
  const RATING_SCORE = 5;
  const DEFAULT_RATING = Number(value) || 0;

  const [rating, setRating] = useState(DEFAULT_RATING);
  const [hoverValue, setHoverValue] = useState(DEFAULT_RATING);
  const inputRef = useRef(null);

  useEffect(() => {
    setRating(DEFAULT_RATING);
    setHoverValue(DEFAULT_RATING);
  }, [value, DEFAULT_RATING]);

  return (
    <Flex
      height="40px"
      alignItems="center"
      onMouseOut={() => setHoverValue(rating)}
    >
      <input
        id="input_rating"
        name="rating"
        min={0}
        max={RATING_SCORE}
        type="number"
        value={rating}
        disabled={isDisabled}
        onChange={onChange}
        hidden
        ref={inputRef}
      ></input>

      {/** Star Rating CONTAINER */}
      <Flex alignItems="center" position="relative">
        {/** Reset Star Rating */}
        <Flex
          h="2rem"
          w="1rem"
          position="absolute"
          left="-1rem"
          justifyContent="center"
          zIndex={2}
        >
          <Box
            w="100%"
            cursor={isDisabled ? 'default' : 'pointer'}
            onClick={() => {
              if (isDisabled) return;
              setRating(0);
              triggerInputEvent(inputRef!.current, 0);
            }}
            onMouseOver={() => {
              if (isDisabled) return;
              setHoverValue(0);
            }}
          ></Box>
        </Flex>

        {/** Stars */}
        {Array.from(Array(RATING_SCORE).keys()).map((i) => {
          return (
            <StarRatingInput
              isDisabled={isDisabled}
              key={i}
              min={i + 0.5}
              max={i + 1}
              hoverValue={hoverValue}
              onClick={(rating: number) => {
                if (isDisabled) return;
                setRating(rating);
                triggerInputEvent(inputRef!.current, rating);
              }}
              onHover={(rating: number) => {
                if (isDisabled) return;
                setHoverValue(rating);
              }}
            />
          );
        })}
      </Flex>

      <Flex alignItems="center" ml={4}>
        <Text>{hoverValue ? `${hoverValue} Rating` : 'Unrated'}</Text>
      </Flex>
    </Flex>
  );
}

export default StarRatingSlider;
