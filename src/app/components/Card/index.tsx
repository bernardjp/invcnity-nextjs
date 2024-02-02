import React from 'react';
import Link from 'next/link';
import { Flex } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import { useVariantStyle } from '@/app/hooks/useVariantStyle';
import { ListType, RoleType } from '@/firebase/customTypes';
import CardImage from './CardImage';
import CardRoleIcon from './CardRoleIcon';
import CardTitle from './CardTitle';
import CardFavoriteIcon from './CardFavoriteIcon';
import CardUpperTag from './CardUpperTag';
import CardAnchorIcon from './CardAnchorIcon';

type PropType = {
  id: string;
  path: string;
  title: string;
  type: ListType;
  locationURL?: string;
  publicationURL?: string;
  userRole?: RoleType;
  isVisited?: boolean;
  isFavorite?: boolean;
  children?: React.ReactElement;
  setFavoriteHandler: (e: boolean) => void;
};

function Card(props: PropType): React.ReactElement {
  const {
    id,
    path,
    title,
    type,
    userRole,
    isVisited,
    isFavorite,
    locationURL,
    publicationURL,
    children,
    setFavoriteHandler,
  } = props;

  const { styles, variant } = useVariantStyle('CardContainer', type, {
    defaultVariant: path === 'listas',
  });

  return (
    <Flex
      cursor="pointer"
      position="relative"
      transition="0.2s"
      _hover={{
        transform: 'translate(0, -5px)',
      }}
      _active={{
        transform: 'translate(0, 0px)',
      }}
    >
      <Flex
        justifyContent="space-between"
        position="absolute"
        p={2}
        w="100%"
        zIndex={3}
      >
        <Flex gap={1} bg="white" zIndex={3}>
          <CardFavoriteIcon
            variant={variant}
            isFavorite={isFavorite}
            setFavorite={setFavoriteHandler}
          />
          {publicationURL && (
            <CardAnchorIcon
              label="Go to PUBLICATION"
              variant={variant}
              type="publication"
              pageURL={publicationURL}
            />
          )}
          {locationURL && (
            <CardAnchorIcon
              label="Go to LOCATION"
              variant={variant}
              type="location"
              pageURL={locationURL}
            />
          )}
        </Flex>
        {userRole && <CardRoleIcon userRole={userRole} variant={variant} />}
      </Flex>
      {isVisited && <CardUpperTag text="Visited!" variant={variant} />}
      <Link href={`/${path}/${id}?type=${type}&name=${title}`}>
        <Flex __css={styles} zIndex={2}>
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
            variant={
              `${variant}${
                path === 'propiedades' ? 'Light' : ''
              }` as ThemeVariant
            }
            text={title}
          />
        </Flex>
      </Link>
    </Flex>
  );
}

export default Card;
