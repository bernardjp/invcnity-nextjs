import React, { useEffect } from 'react';
import Image from 'next/image';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import CustomLink from '../Utils/CustomLink';

type Props = {
  actionCallback: () => void;
  error?: Error & { digest?: string };
};

function ErrorHandling(props: Props) {
  const { actionCallback, error } = props;

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Flex
      as="section"
      alignItems="center"
      justifyContent="center"
      minHeight="calc(100vh - 112px)"
      padding="1rem"
      w="90%"
    >
      <Flex
        height="100%"
        gap={{ base: '2rem', md: '4rem' }}
        alignItems="center"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Box height="100%">
          <Image
            src="/images/error-default.svg"
            alt="Error"
            width={480}
            height={1}
          />
        </Box>
        <Stack height="100%" gap="1rem">
          <Text
            as="h2"
            textAlign="center"
            fontSize="1.8rem"
            fontWeight="bold"
            color="brand.chocolate"
          >
            Something went wrong!
          </Text>
          <Text maxW="410px" w="100%" fontSize="1.2rem" color="brand.chocolate">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
            praesentium consectetur autem ipsa, recusandae corporis.
          </Text>
          <Flex gap={4} justifyContent="center" mt="1rem">
            <Button onClick={actionCallback} variant="tertiary">
              Try again
            </Button>
            <CustomLink url="/" variant="primaryOutline">
              Go back!
            </CustomLink>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default ErrorHandling;
