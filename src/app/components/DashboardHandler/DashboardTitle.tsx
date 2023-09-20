'use client';
import React from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';

type Props = {
  type: 'estate' | 'list';
  title: string;
};

function DashboardTitle(props: Props) {
  const { type, title } = props;
  const { openModal } = useCreateResourceModal(type);

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
      <Flex
        alignItems="baseline"
        as="h2"
        borderBottom="1px dotted grey"
        flexWrap="wrap"
        fontSize="2rem"
        fontWeight="bold"
        height="fit-content"
        justifyContent={{ base: 'center', md: 'left' }}
        width="100%"
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

      <div>
        <Button
          bg="linear-gradient(70deg, rgb(255, 178, 43) 10%, rgb(255, 113, 97) 38%, rgb(255, 113, 97) 62%, rgb(0, 180, 111) 85%)"
          border="2px solid white"
          borderRadius="3rem"
          boxShadow="2px 5px 13px -5px rgba(0, 0, 0, 0.5)"
          color="brand.chocolate"
          fontWeight="bold"
          height="auto"
          padding="0.5rem"
          transition="0.15s"
          _hover={{
            transform: 'scale(1.02)',
          }}
          onClick={() => openModal()}
        >
          <span
            style={{
              backgroundColor: 'white',
              padding: '0.7rem 1.1rem',
              borderRadius: '24px',
            }}
          >
            New {type === 'estate' ? 'Estate' : 'VCNITy'}
          </span>
        </Button>
      </div>
    </Flex>
  );
}

export default DashboardTitle;
