import { EstateListDoc } from '@/firebase/customTypes';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import ListSnippet from './ListSnippet';

export default function ListSnippetsList(props: {
  listData?: EstateListDoc[];
  userID: string;
}) {
  const { listData, userID } = props;

  return (
    <Flex w="100%" gap="2rem">
      {listData &&
        listData.map((list) => (
          <ListSnippet key={list.id} listData={list} userID={userID} />
        ))}
    </Flex>
  );
}
