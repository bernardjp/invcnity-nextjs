'use client';
import React from 'react';
import { EstateListDoc } from '@/firebase/customTypes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '@/firebase/clientApp';
import { collection } from 'firebase/firestore';
import ListCard from './ListCard';
import DashboardHandler from '../DashboardHandler';
import { useFavoriteList } from '@/app/hooks/useSetFavorite.';
import EmptyDashboard from '../DashboardHandler/EmptyDashboard';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import EmptyCard from '../Card/EmptyCard';
import { Box, Flex, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function ListsDashboard() {
  const [user] = useAuthState(auth); // --> At this point the User should be already authenticated
  const [value, loading, error] = useCollection(
    collection(firestore, `users/${user?.uid}/listSnippets`)
  );
  const setFavorite = useFavoriteList();
  const { openModal } = useCreateResourceModal('list');

  return (
    <DashboardHandler loading={loading} error={error?.message}>
      {value?.empty ? (
        <EmptyDashboard
          title="This List is Empty."
          text="Try creating a new VCNITY, and start dreaming about your future!"
          actionCallback={() => openModal('create')}
        />
      ) : (
        <>
          {value?.docs.map((list) => (
            <ListCard
              key={list.id}
              list={list.data() as EstateListDoc}
              userRole={list.data().roles[user!.uid]}
              setFavoriteHandler={(isFavorite: boolean) => {
                setFavorite(user!.uid, list.id, isFavorite);
              }}
            />
          ))}
          <EmptyCard type="house" actionCallback={() => openModal('create')}>
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

export default ListsDashboard;
