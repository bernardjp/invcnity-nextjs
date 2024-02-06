import React from 'react';
import Link from 'next/link';
import { ParamData } from '@/firebase/customTypes';
import { Flex, Text } from '@chakra-ui/react';

type Props = {
  listData?: ParamData | false;
  estateName: string;
  loading: boolean;
};

function EstateTitle(props: Props) {
  const { listData, estateName, loading } = props;

  return (
    <Flex gap={3}>
      {!loading && listData ? (
        <Text
          maxWidth="540px"
          overflow="hidden"
          textOverflow="ellipsis"
          _hover={{
            textDecor: 'underline',
          }}
        >
          <Link
            href={`/listas/${listData.id}?type=${listData.type}&name=${listData.name}`}
          >
            {listData.name}
          </Link>
        </Text>
      ) : (
        '...'
      )}
      {' / '}
      <Text>{estateName}</Text>
    </Flex>
  );
}

export default EstateTitle;
