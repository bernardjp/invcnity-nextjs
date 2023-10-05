'use client';
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

type Props = {
  title: string;
  menu?: React.ReactNode;
  addButton?: React.ReactNode;
};

function DashboardTitle(props: Props) {
  const { title, menu, addButton } = props;

  return (
    <Flex
      alignItems="center"
      flexDirection={{ base: 'column', md: 'row' }}
      gap="2rem"
      justifyContent={{ base: 'center', md: 'space-between' }}
      mb="1.5rem"
      px="1rem"
      textAlign={{ base: 'center', md: 'left' }}
    >
      <Flex alignItems="center">
        <Flex
          alignItems="baseline"
          as="h2"
          borderBottom="1px dotted grey"
          flexWrap="wrap"
          fontSize="2rem"
          fontWeight="bold"
          height="fit-content"
          justifyContent={{ base: 'center', md: 'left' }}
          mr="0.8rem"
        >
          This are your{' '}
          <Box
            as="span"
            bg="linear-gradient(70deg, rgb(255, 178, 43) 10%, rgb(255, 113, 97) 38%, rgb(255, 113, 97) 62%, rgb(0, 180, 111) 85%)"
            bgClip="text"
            color="transparent"
            fontSize="2.5rem"
            ml="0.5rem"
          >
            {title}
          </Box>
        </Flex>
        {menu}
      </Flex>
      {addButton}
    </Flex>
  );
}

export default DashboardTitle;
