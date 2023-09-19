import React from 'react';
import Link from 'next/link';
import { Flex, useStyleConfig } from '@chakra-ui/react';
import { listVariant } from '@/style/componentsStyleConfig';
import { ListType, ListRoleType } from '../Modal/ListCreation/utils/validation';
import CardImage from './CardImage';
import CardRoleIcon from './CardRoleIcon';
import CardTitle from './CardTitle';
import CardFavoriteIcon from './CardFavoriteIcon';
import CardUpperTag from './CardUpperTag';

type PropType = {
  id: string;
  path: string;
  title: string;
  type: ListType;
  userRole?: ListRoleType;
  isVisited?: boolean;
  children?: React.ReactElement;
};

function Card(props: PropType): React.ReactElement {
  const { id, path, title, type, userRole, isVisited, children } = props;
  const variant = listVariant[type];
  const styles = useStyleConfig('CardContainer', {
    variant: path === 'listas' ? 'list' : variant,
  });

  return (
    <Flex
      cursor="pointer"
      position="relative"
      transition="0.2s"
      _hover={{
        transform: 'translate(0, -5px)',
      }}
    >
      <CardFavoriteIcon variant={variant} />
      {isVisited && <CardUpperTag text="Visited!" variant={variant} />}
      {userRole && <CardRoleIcon userRole={userRole} variant={variant} />}
      <Link href={`/${path}/${id}`}>
        <Flex __css={styles}>
          <Flex
            alignItems="center"
            height="12rem"
            overflow="hidden"
            p={4}
            position="relative"
            width="18rem"
          >
            <CardImage type={type} variant={type} />
          </Flex>
          <Flex
            justifyContent="space-evenly"
            mb={3}
            alignItems="center"
            height="2rem"
          >
            {children}
          </Flex>
          <CardTitle
            variant={`${variant}${path === 'propiedades' ? 'Light' : ''}`}
            text={title}
          />
        </Flex>
      </Link>
    </Flex>
  );
}

export default Card;
