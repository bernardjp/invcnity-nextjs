'use client';
import React from 'react';
import Card from '../Card';
import { ListType } from '@/firebase/customTypes';
import FixedSlider from '../StarRatingSlider/FixedSlider';

type Props = {
  id: string;
  estateName: string;
  type: ListType;
  isVisited?: boolean;
  isFavorite?: boolean;
  location: string;
  locationURL: string;
  publicationURL: string;
  price: string;
  rating?: string;
  setFavoriteHandler: (e: boolean) => void;
};

function EstateCard(props: Props) {
  const {
    id,
    estateName,
    type,
    isVisited,
    isFavorite,
    locationURL,
    publicationURL,
    price,
    rating,
    setFavoriteHandler,
  } = props;

  const CurrencyFormat = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Card
      id={id}
      path="propiedades"
      title={estateName}
      type={type}
      isVisited={isVisited}
      isFavorite={isFavorite}
      locationURL={locationURL}
      publicationURL={publicationURL}
      setFavoriteHandler={setFavoriteHandler}
    >
      <>
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
          {CurrencyFormat.format(Number(price))}
        </span>
        |
        <span
          style={{
            inlineSize: '6rem',
            lineHeight: '1rem',
            textAlign: 'center',
            fontSize: '0.9rem',
          }}
        >
          <FixedSlider rating={Number(rating)} />
        </span>
      </>
    </Card>
  );
}

export default EstateCard;
