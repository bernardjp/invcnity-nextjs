import React from 'react';
import { EstateListDoc, RoleType } from '@/firebase/customTypes';
import Card from '../Card';

type PropType = {
  id: string;
  list: EstateListDoc;
  userRole?: RoleType;
  setFavoriteHandler: (e: boolean) => void;
};

function ListCard(props: PropType): React.ReactElement {
  const {
    id,
    list: { type, listName, isFavorite },
    userRole,
    setFavoriteHandler,
  } = props;

  return (
    <Card
      id={id}
      isFavorite={isFavorite}
      path="listas"
      title={listName}
      type={type}
      userRole={userRole}
      setFavoriteHandler={setFavoriteHandler}
    >
      <span style={{ fontStyle: 'italic' }}>
        {type === 'apartment' && 'Find your urban oasis!'}
        {type === 'vacation' && 'Unwind in paradise'}
        {type === 'house' && 'Space to grow, room to breathe'}
        {type === 'countryside' && 'Trade city lights for fireflies'}
      </span>
    </Card>
  );
}

export default ListCard;
