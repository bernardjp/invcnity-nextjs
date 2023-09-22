'use client';
import React from 'react';
import Card from '../Card';
import { ListType } from '../Modal/ListCreation/utils/validation';

type Props = {
  id: string;
  estateName: string;
  type: ListType;
  isVisited?: boolean;
  isFavorite?: boolean;
  location: string;
  price: string;
};

function EstateCard(props: Props) {
  const { id, estateName, type, isVisited, isFavorite, location, price } =
    props;

  return (
    <Card
      id={id}
      path="propiedades"
      title={estateName}
      type={type}
      isVisited={isVisited}
      isFavorite={isFavorite}
    >
      <>
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>${price}</span>|
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
