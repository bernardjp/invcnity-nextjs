'use client';
import React from 'react';
import { EstateListDoc } from '@/firebase/customTypes';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '@/firebase/clientApp';
import { collection } from 'firebase/firestore';
import ListCard from './ListCard';
import { useFavoriteList } from '@/app/hooks/useSetFavorite.';
import EmptyDashboard from '../DashboardHandler/EmptyDashboard';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import EmptyCard from '../Card/EmptyCard';
import { Flex, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useGetUserID } from '@/app/hooks/useGetUserID';
import DashboardTitle from '../DashboardHandler/DashboardTitle';
import LoadingSkeleton from '../DashboardHandler/LoadingSkeleton';
import NotFoundWrapper from '../ErrorHandling/NotFoundWrapper';

function ListsDashboard() {
  const userID = useGetUserID();
  const [value, loading, error] = useCollection(
    collection(firestore, `users/${userID}/listSnippets`)
  );
  const setFavorite = useFavoriteList();
  const { openModal } = useCreateResourceModal('list');

  return (
    <>
      <NotFoundWrapper notFound={Boolean(error?.message)}>
        <DashboardTitle title="VCNITIES" />
        {value?.empty ? (
          <EmptyDashboard
            title="This List is Empty."
            text="Try creating a new VCNITY, and start dreaming about your future!"
            actionCallback={() => openModal('create')}
          />
        ) : (
          <>
            {/* <DashboardTitle title="VCNITIES" /> */}
            <Flex flexWrap="wrap" gap="10px">
              {loading && <LoadingSkeleton />}
              {value?.docs.map((list) => (
                <ListCard
                  key={list.id}
                  id={list.id}
                  list={list.data() as EstateListDoc}
                  userRole={list.data().roles[userID!]}
                  setFavoriteHandler={(isFavorite: boolean) => {
                    setFavorite(userID!, list.id, isFavorite);
                  }}
                />
              ))}
              <EmptyCard
                type="house"
                actionCallback={() => openModal('create')}
              >
                <Flex border="2px solid" borderRadius="full" p={2}>
                  <AddIcon boxSize={7} />
                </Flex>
                <Text mt={4}>Create a new VCNITY</Text>
              </EmptyCard>
            </Flex>
          </>
        )}
      </NotFoundWrapper>
    </>
  );
}

export default ListsDashboard;
