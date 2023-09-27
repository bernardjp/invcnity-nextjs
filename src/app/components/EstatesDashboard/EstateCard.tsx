'use client';
import React from 'react';
import Card from '../Card';
import { ListType } from '@/firebase/customTypes';

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
};

function EstateCard(props: Props) {
  const {
    id,
    estateName,
    type,
    isVisited,
    isFavorite,
    location,
    locationURL,
    publicationURL,
    price,
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
          {location}
        </span>
      </>
    </Card>
  );
}

export default EstateCard;
