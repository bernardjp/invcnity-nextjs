import React from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';

type Props = {
  title: string;
  text: string;
  actionCallback: () => void;
};

function EmptyDashboard(props: Props) {
  const { title, text, actionCallback } = props;
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
        <Flex justifyContent="center" mt="1.5rem">
          <Button
            bg="transparent"
            border="2px solid"
            borderRadius="full"
            borderColor="brand.lightChocolate"
            color="brand.chocolate"
            fontSize="1.3rem"
            px="1.5rem"
            width="fit-content"
            _hover={{
              bg: 'brand.chocolate',
              color: 'white',
            }}
            onClick={actionCallback}
          >
            CREATE!
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default EmptyDashboard;
