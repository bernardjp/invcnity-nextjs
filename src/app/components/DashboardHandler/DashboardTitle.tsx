'use client';
import React from 'react';
import { Flex } from '@chakra-ui/react';

type Props = {
  title: string;
  menu?: React.ReactNode;
  actionButton?: React.ReactNode;
};

function DashboardTitle(props: Props) {
  const { title, menu, actionButton } = props;

  return (
    <Flex
      alignItems="center"
      flexDirection={{ base: 'column', md: 'row' }}
      gap="2rem"
      justifyContent={{ base: 'center', md: 'space-between' }}
      mb="1.5rem"
      textAlign={{ base: 'center', md: 'left' }}
    >
      <Flex alignItems="center">
        <Flex
          as="h2"
          bg="linear-gradient(70deg, rgb(255, 178, 43) 10%, rgb(255, 113, 97) 38%, rgb(255, 113, 97) 62%, rgb(0, 180, 111) 85%)"
          bgClip="text"
          borderBottom="2px dotted beige"
          color="transparent"
          flexWrap="wrap"
          fontSize="2.5rem"
          fontWeight="bold"
          gap="1rem"
          height="fit-content"
          justifyContent={{ base: 'center', md: 'left' }}
          mr="0.8rem"
        >
          {title}
        </Flex>
        {menu}
      </Flex>
      {actionButton}
    </Flex>
  );
}

export default DashboardTitle;
