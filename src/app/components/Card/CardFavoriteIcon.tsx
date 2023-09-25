import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import CardIcon from './CardIcon';

function CardFavoriteIcon(props: {
  variant: ThemeVariant;
  isFavorite?: boolean;
}): React.ReactElement {
  const { variant, isFavorite } = props;

  const [favoriteVal, setFavorite] = useState(isFavorite);

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setFavorite((prev) => !prev);
  };

  return (
    <CardIcon variant={variant} onClickHandler={onClickHandler}>
      <Image
        src={`/icons/fav-${favoriteVal ? 'on' : 'off'}.svg`}
        alt=""
        width="80%"
      />
    </CardIcon>
  );
}

export default CardFavoriteIcon;
