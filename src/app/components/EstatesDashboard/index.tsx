'use client';
import React from 'react';
import EstateCard from './EstateCard';
import DashboardHandler from '../DashboardHandler';
import { firestore } from '@/firebase/clientApp';
import { collection } from 'firebase/firestore';
import { EstateDoc, ListType } from '@/firebase/customTypes';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams } from 'next/navigation';
import { useFavoriteEstate } from '@/app/hooks/useSetFavorite.';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import EmptyDashboard from '../DashboardHandler/EmptyDashboard';
import EmptyCard from '../Card/EmptyCard';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';

function EstateDashboard() {
  const params: { id: string } = useParams();
  const [type, id] = params.id.split('_');
  const [value, loading, error] = useCollection(
    collection(firestore, `estate_lists/${id}/estateSnippets`)
  );
  const setFavorite = useFavoriteEstate();
  const { openModal } = useCreateResourceModal('estate');

  return (
    <DashboardHandler loading={loading} error={error?.message}>
      {value?.empty ? (
        <EmptyDashboard
          title="This VCNITY is Empty!"
          text="Try adding a new Estate, and start building up this VCNITY."
          actionCallback={() => openModal('create')}
        />
      ) : (
        <>
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
        </>
      )}
    </DashboardHandler>
  );
}

export default EstateDashboard;
