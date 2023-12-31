import React from 'react';
import { Box, Flex, useStyleConfig } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import CardTooltip from './CardTooltip';

type Props = {
  label: string;
  variant: ThemeVariant;
  onClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};

function CardIcon(props: Props): React.ReactElement {
  const { label, variant, onClickHandler, children } = props;
  const iconStyles = useStyleConfig('CardIcon', { variant });

  return (
    <CardTooltip label={label} variant={variant}>
      <Box bg="white" borderRadius="full">
        <Flex
          border="2px solid"
          borderRadius="full"
          boxShadow="0px 5px 10px -5px black"
          display="flex"
          height="41px"
          justifyContent="center"
          opacity={0.6}
          p="3px"
          transition="0.15s"
          width="41px"
          zIndex={5} // The Icon MUST be in front of the card to be clickable
          _hover={{
            border: '2px solid',
            cursor: 'pointer',
            opacity: '1',
          }}
          __css={iconStyles}
          onClick={onClickHandler}
        >
          {children}
        </Flex>
      </Box>
    </CardTooltip>
  );
}

export default CardIcon;
