import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';

function EmptyDashboard(props: { title: string; text: string }) {
  const { title, text } = props;
  return (
    <Flex
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: '1rem', md: '4rem' }}
      justifyContent="center"
      w="100%"
    >
      <Image
        src="/images/empty-dashboard.svg"
        alt="empty vicinity"
        maxW="480px"
        w="100%"
      />
      <Flex direction="column">
        <Text
          as="h2"
          fontSize="2rem"
          textAlign={{ base: 'center', md: 'start' }}
        >
          {title}
        </Text>
        <Text fontSize="1.2rem">{text}</Text>
      </Flex>
    </Flex>
  );
}

export default EmptyDashboard;
