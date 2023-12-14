import { EstateListDoc } from '@/firebase/customTypes';
import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import ListSnippet from './ListSnippet';
import DashboardTitle from '../DashboardHandler/DashboardTitle';

export default function ListSnippetsList(props: {
  listData?: EstateListDoc[];
  userID: string;
}) {
  const { listData, userID } = props;

  return (
    <Stack>
      <DashboardTitle title="VCNITIES Created" />
      <Flex w="100%" gap="2rem">
        {listData &&
          listData.map((list) => (
            <ListSnippet key={list.id} listData={list} userID={userID} />
          ))}
      </Flex>
    </Stack>
  );
}
