import { EstateListDoc } from '@/firebase/customTypes';
import { Stack } from '@chakra-ui/react';
import React from 'react';

export default function ListSnippetsList(props: {
  listData?: EstateListDoc[];
}) {
  const { listData } = props;

  return (
    <Stack>
      <h3>VCNITIES Created</h3>
      <ul>
        {listData &&
          listData.map((list) => <li key={list.id}>{list.listName}</li>)}
      </ul>
    </Stack>
  );
}
