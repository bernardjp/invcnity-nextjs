import React from 'react';
import { Flex } from '@chakra-ui/react';
import FixedStarRating from './FixedStarRating';

type Props = {
  rating: number;
};

function FixedSlider(props: Props) {
  const { rating } = props;
  const RATING_SCORE = 5;

  return (
    <Flex height="40px" alignItems="center">
      <Flex alignItems="center" position="relative">
        {Array.from(Array(RATING_SCORE).keys()).map((i) => {
          let value: 'empty' | 'full' | 'half' = 'empty';

          if (i + 0.5 === rating) value = 'half';
          if (i + 1 <= rating) value = 'full';

          return <FixedStarRating key={i} value={value} />;
        })}
      </Flex>
    </Flex>
  );
}

export default FixedSlider;
