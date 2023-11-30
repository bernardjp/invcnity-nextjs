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

function ListsDashboard() {
  const [user] = useAuthState(auth); // --> At this point the User should be already authenticated
  const [value, loading, error] = useCollection(
    collection(firestore, `users/${user?.uid}/listSnippets`)
  );
  const setFavorite = useFavoriteList();

  return (
    <DashboardHandler loading={loading} error={error?.message}>
      {value &&
        value.docs.map((list) => (
          <ListCard
            key={list.id}
            list={list.data() as EstateListDoc}
            userRole={list.data().roles[user!.uid]}
            setFavoriteHandler={(isFavorite: boolean) => {
              setFavorite(user!.uid, list.id, isFavorite);
            }}
          />
        ))}
    </DashboardHandler>
  );
}

export default ListsDashboard;
