import { EstateListDoc } from '@/firebase/customTypes';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import ListSnippet from './ListSnippet';
import Link from 'next/link';
import { AddIcon } from '@chakra-ui/icons';

function DefaultSnippet() {
  return (
    <Link href="/listas">
      <Flex
        alignItems="center"
        bg="brand.lightRed"
        border="3px dotted"
        borderColor="brand.red"
        borderRadius="24px"
        boxShadow="0px 5px 15px -7px rgba(0,0,0,0.5)"
        color="brand.red"
        fontSize="1.1rem"
        fontWeight="bold"
        gap="1rem"
        p="5px 5px 5px 18px"
        position="relative"
        transition="0.2s"
        _hover={{
          transform: 'translate(0, -3px)',
        }}
      >
        Start Creating VCNITIES!
        <Flex
          alignItems="center"
          bg="white"
          border="2px solid"
          borderColor="brand.red"
          borderRadius="full"
          h="fit-content"
          opacity={0.7}
          p="10px"
        >
          <AddIcon boxSize={4} color="brand.red" />
        </Flex>
      </Flex>
    </Link>
  );
}

export default function ListSnippetsList(props: {
  listData: EstateListDoc[];
  userID: string;
}) {
  const { listData, userID } = props;

  return (
    <Flex w="100%" gap="2rem">
      {listData.length > 0 ? (
        listData.map((list) => (
          <ListSnippet key={list.id} listData={list} userID={userID} />
        ))
      ) : (
        <DefaultSnippet />
      )}
    </Flex>
  );
}
