import React from 'react';
import Link from 'next/link';
import { EstateListDoc } from '@/firebase/customTypes';
import { Flex, useStyleConfig } from '@chakra-ui/react';
import CardRoleIcon from '../Card/CardRoleIcon';
import { listVariant } from '@/style/componentsStyleConfig';

function ListSnippet(props: { listData: EstateListDoc; userID: string }) {
  const { listData, userID } = props;
  const variant = listVariant[listData.type];

  const styles = useStyleConfig('SnippetContainer', { variant });

  return (
    <Link href={`/listas/${listData.type}_${listData.id}`}>
      <Flex
        alignItems="center"
        border="2px solid"
        borderRadius="24px"
        boxShadow="0px 9px 20px -12px rgba(238, 152, 0, 0.7)"
        height="fit-content"
        p="6px 6px 6px 20px"
        fontWeight="bold"
        position="relative"
        fontSize="1.1rem"
        gap="1rem"
        transition="0.2s"
        _hover={{
          transform: 'translate(0, -2px)',
        }}
        _active={{
          transform: 'translate(0, 0px)',
        }}
        sx={styles}
      >
        {listData.listName}
        <CardRoleIcon userRole={listData.roles[userID]} variant={variant} />
      </Flex>
    </Link>
  );
}

export default ListSnippet;
