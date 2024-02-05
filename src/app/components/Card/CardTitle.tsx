import React from 'react';
import { Flex, useStyleConfig } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';

type PropType = {
  text: string;
  variant: ThemeVariant;
};

function CardTitle(props: PropType): React.ReactElement {
  const { text, variant } = props;
  const styles = useStyleConfig('VariantText', { variant });

  return (
    <Flex
      alignItems="center"
      borderBottomEndRadius={24}
      borderBottomLeftRadius={24}
      display="flex"
      height="calc(2rem + 28px)" // (1rem x 2 = 2 lines of text) + (14px x 2 = 14px of vertical padding)
      justifyContent="center"
      __css={styles}
    >
      <Flex
        as="h4"
        display="-webkit-box"
        fontSize={text.length < 30 ? '18px' : '16px'}
        fontWeight="bold"
        inlineSize="18rem"
        lineHeight="1.3rem"
        overflow="hidden"
        paddingInline="1rem"
        textOverflow="ellipsis"
        textAlign="center"
        whiteSpace="pre-wrap"
        style={{
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: '2',
        }}
      >
        {text}
      </Flex>
    </Flex>
  );
}

export default CardTitle;
