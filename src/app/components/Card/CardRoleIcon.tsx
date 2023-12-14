import React from 'react';
import { Box, Flex, Image, useStyleConfig } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import { RoleType } from '@/firebase/customTypes';
import CardTooltip from './CardTooltip';

type PropType = {
  userRole?: RoleType;
  variant: ThemeVariant;
};

function CardRoleIcon(props: PropType): React.ReactElement {
  const { userRole, variant } = props;
  const iconStyles = useStyleConfig('CardIcon', { variant });

  return (
    <CardTooltip variant={variant} label={`Role: ${userRole!.toUpperCase()}`}>
      <Box bg="white" borderRadius="full" h="2.5rem" w="2.5rem">
        <Flex
          border="2px solid"
          borderRadius="full"
          boxShadow="0px 5px 10px -5px black"
          height="inherit"
          justifyContent="center"
          opacity={0.8}
          p="3px"
          width="inherit"
          zIndex={5}
          __css={iconStyles}
        >
          <Image
            src={`/icons/user-${userRole}.svg`}
            alt=""
            width="90%"
            pl="5px"
            pt="5px"
          />
        </Flex>
      </Box>
    </CardTooltip>
  );
}

export default CardRoleIcon;
