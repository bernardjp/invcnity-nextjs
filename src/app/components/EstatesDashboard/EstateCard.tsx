'use client';
import React from 'react';
import Card from '../Card';

function EstateCard() {
  // Mocked data
  const title = 'Nombre de la publicación';
  const id = '32165761321';
  const type = 'vacation';
  const isVisited = true; // Check from the User data if the location is marked as 'visited'.

  return (
    <Card
      id={id}
      path="propiedades"
      title={title}
      type={type}
      isVisited={isVisited}
    >
      <>
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
          $100,000.00
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
          San Martin de los Andes
        </span>
      </>
    </Card>
  );
}

export default EstateCard;
