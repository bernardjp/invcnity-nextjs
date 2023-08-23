import React from 'react';
import Link from 'next/link';
import { ListInfoType } from '../Modal/ListCreation/utils/validation';

function ListCard(props: { list: ListInfoType }): React.ReactElement {
  const { list } = props;

  return (
    <Link
      key={list.listName}
      href={`/listas/${list.id}`}
      style={{ padding: '1rem' }}
    >
      {list.listName}
    </Link>
  );
}

export default ListCard;
