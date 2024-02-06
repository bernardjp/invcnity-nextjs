'use client';
import React from 'react';
import { Box, Flex, useStyleConfig } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';

type Props = {
  title: React.ReactNode;
  menu?: React.ReactNode;
  actionButton?: React.ReactNode;
  variant?: ThemeVariant;
};

function DashboardTitle(props: Props) {
  const { title, menu, actionButton, variant } = props;
  const styles = useStyleConfig('VariantText', { variant });

  return (
    <Flex
      alignItems="center"
      gap="2rem"
      justifyContent="space-between"
      mb="1.5rem"
    >
      <Flex
        as="h2"
        flexWrap="wrap"
        fontSize="min(7vw, 2.2rem)"
        fontWeight="bold"
        height="fit-content"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
        __css={styles}
      >
        {title}
      </Flex>
      <Flex alignItems="space-between" gap="0.5rem">
        {menu}
        <Box display={{ base: 'none', md: 'block' }}>{actionButton}</Box>
      </Flex>
    </Flex>
  );
}

export default DashboardTitle;
