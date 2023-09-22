import React, { useState } from 'react';
import { Flex, Image, useStyleConfig } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';

function CardFavoriteIcon(props: {
  variant: ThemeVariant;
  isFavorite?: boolean;
}): React.ReactElement {
  const { variant, isFavorite } = props;
  const iconStyles = useStyleConfig('CardIcon', { variant });

  const [favoriteVal, setFavorite] = useState(isFavorite);

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setFavorite((prev) => !prev);
  };

  return (
    <Flex
      border="2px solid"
      borderRadius="full"
      height="41px"
      justifyContent="center"
      opacity={0.6}
      p="3px"
      position="absolute"
      left={2}
      top={2}
      transition="0.15s"
      width="41px"
      zIndex={5} // The Icon MUST be in front of the card to be clickable
      _hover={{
        opacity: '1',
        border: '2px solid',
      }}
      __css={iconStyles}
      onClick={onClickHandler}
    >
      <Image
        src={`/icons/fav-${favoriteVal ? 'on' : 'off'}.svg`}
        alt=""
        width="90%"
        pl="3px"
        pt="3px"
      />
    </Flex>
  );
}

export default CardFavoriteIcon;
