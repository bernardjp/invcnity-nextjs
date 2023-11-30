import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import CardIcon from './CardIcon';

function CardFavoriteIcon(props: {
  variant: ThemeVariant;
  isFavorite?: boolean;
  setFavorite: (e: boolean) => void;
}): React.ReactElement {
  const { variant, isFavorite, setFavorite } = props;
  const [value, setValue] = useState(Boolean(isFavorite));

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setValue((prev) => !prev);
    setFavorite(!value);
  };

  return (
    <CardIcon label="" variant={variant} onClickHandler={onClickHandler}>
      <Image
        src={`/icons/fav-${value ? 'on' : 'off'}.svg`}
        alt=""
        width="80%"
      />
    </CardIcon>
  );
}

export default CardFavoriteIcon;
