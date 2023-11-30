import React from 'react';
import { EstateListDoc, RoleType } from '@/firebase/customTypes';
import Card from '../Card';

type PropType = {
  list: EstateListDoc;
  userRole?: RoleType;
  setFavoriteHandler: (e: boolean) => void;
};

function ListCard(props: PropType): React.ReactElement {
  const {
    list: { id, type, listName },
    userRole,
    setFavoriteHandler,
  } = props;

  const estates = 0; // Mocked value

  return (
    <Card
      id={id}
      path="listas"
      title={listName}
      type={type}
      userRole={userRole}
      setFavoriteHandler={setFavoriteHandler}
    >
      <span>
        {estates ? (
          <>
            <b>{estates}</b> estates in this VCNITY
          </>
        ) : (
          <>
            This VCNITY is <b>Empty</b>
          </>
        )}
      </span>
    </Card>
  );
}

export default ListCard;
