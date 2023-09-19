import React from 'react';
import { Flex, Image, Tooltip, useStyleConfig } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import { ListRoleType } from '../Modal/ListCreation/utils/validation';

type PropType = {
  userRole?: ListRoleType;
  variant: ThemeVariant;
};

function CardRoleIcon(props: PropType): React.ReactElement {
  const { userRole, variant } = props;
  const iconStyles = useStyleConfig('CardIcon', { variant });

  return (
    <Tooltip
      variant={variant}
      label={`Role: ${userRole!.toUpperCase()}`}
      placement="top"
    >
      <Flex
        border="2px solid"
        borderRadius="full"
        height="2.5rem"
        justifyContent="center"
        opacity={0.8}
        p="3px"
        position="absolute"
        right={2}
        top={2}
        width="2.5rem"
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
    </Tooltip>
  );
}

export default CardRoleIcon;
