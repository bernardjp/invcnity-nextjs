import React from 'react';
import {
  ListInfoType,
  ListRoleType,
} from '../Modal/ListCreation/utils/validation';
import Card from '../Card';

type PropType = {
  list: ListInfoType;
  userRole?: ListRoleType;
};

function ListCard(props: PropType): React.ReactElement {
  const {
    list: { id, type, listName },
    userRole,
  } = props;

  const estates = 0; // Mocked value

  return (
    <Card
      id={id}
      path="listas"
      title={listName}
      type={type}
      userRole={userRole}
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
