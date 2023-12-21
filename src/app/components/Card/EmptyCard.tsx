'use client';
import React from 'react';
import { Flex, useStyleConfig } from '@chakra-ui/react';
import { listVariant } from '@/style/componentsStyleConfig';
import { ListType } from '@/firebase/customTypes';

type Props = {
  children: React.ReactNode;
  type: ListType;
  actionCallback: () => void;
};

function EmptyCard(props: Props) {
  const { children, type, actionCallback } = props;
  const variant = listVariant[type];
  const style = useStyleConfig('EmptyCardContainer', { variant });

  return (
    <Flex
      border="3px dotted"
      borderRadius="24px"
      cursor="pointer"
      direction="column"
      position="relative"
      transition="0.2s"
      h="300px"
      w="292px"
      color="brand.red"
      alignItems="center"
      justifyContent="center"
      fontWeight="bold"
      fontSize="1.2rem"
      onClick={actionCallback}
      sx={style}
    >
      {children}
    </Flex>
  );
}

export default EmptyCard;
