'use client';
import React from 'react';
import EstateCard from './EstateCard';
import { firestore } from '@/firebase/clientApp';
import { collection } from 'firebase/firestore';
import { EstateDoc, ListType } from '@/firebase/customTypes';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useFavoriteEstate } from '@/app/hooks/useSetFavorite.';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import EmptyDashboard from '../DashboardHandler/EmptyDashboard';
import EmptyCard from '../Card/EmptyCard';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { listVariant, ThemeVariant } from '@/style/componentsStyleConfig';
import DashboardTitle from '../DashboardHandler/DashboardTitle';
import ListTitleMenu from '../DashboardHandler/ListTitleMenu';
import CustomLink from '../Utils/CustomLink';
import LoadingSkeleton from '../DashboardHandler/LoadingSkeleton';
import NotFoundWrapper from '../ErrorHandling/NotFoundWrapper';

type EstateProps = {
  id: string;
  params: {
    type: string;
    name: string;
  };
};

function EstateDashboard(props: EstateProps) {
  const {
    id,
    params: { name, type },
  } = props;

  const [value, loading, error] = useCollection(
    collection(firestore, `estate_lists/${id}/estateSnippets`)
  );
  const setFavorite = useFavoriteEstate();
  const { openModal } = useCreateResourceModal('estate');

  return (
    <NotFoundWrapper notFound={Boolean(error?.message)}>
      <DashboardTitle
        title={name || 'VCNITY Estates'}
        menu={<ListTitleMenu type={type as ListType} listID={id} />}
        actionButton={
          <CustomLink
            url="/listas"
            variant={
              (`${listVariant[type as ListType]}Outline` as ThemeVariant) ||
              'primaryOutline'
            }
          >
            Go Back
          </CustomLink>
        }
      />
      {value?.empty ? (
        <EmptyDashboard
          title="This VCNITY is Empty!"
          text="Try adding a new Estate, and start building up this VCNITY."
          actionCallback={() => openModal('create')}
        />
      ) : (
        <Flex flexWrap="wrap" gap="10px">
          {loading && <LoadingSkeleton />}
          {value?.docs.map((estate) => {
            const estateData = estate.data() as EstateDoc;
            return (
              <EstateCard
                key={estate.id}
                id={estate.id}
                estateName={estateData.estateName}
                location={estateData.location}
                price={estateData.price}
                publicationURL={estateData.publicationURL}
                locationURL={estateData.locationURL}
                type={type as ListType}
                isVisited={estateData.isVisited}
                isFavorite={estateData.isFavorite}
                rating={estateData.rating}
                setFavoriteHandler={(isFavorite: boolean) =>
                  setFavorite(estateData.listID, estate.id, isFavorite)
                }
              />
            );
          })}
          <EmptyCard
            type={type as ListType}
            actionCallback={() => openModal('create')}
          >
            <Flex border="2px solid" borderRadius="full" p={2}>
              <AddIcon boxSize={7} />
            </Flex>
            <Text mt={4}>Create a new VCNITY</Text>
          </EmptyCard>
        </Flex>
      )}
    </NotFoundWrapper>
  );
}

export default EstateDashboard;
