'use client';
import React from 'react';
import { ListInfoType } from '@/firebase/customTypes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '@/firebase/clientApp';
import { collection } from 'firebase/firestore';
import ListCard from './ListCard';
import DashboardHandler from '../DashboardHandler';

function ListsDashboard() {
  const [user] = useAuthState(auth); // --> At this point the User should be already authenticated
  const [value, loading, error] = useCollection(
    collection(firestore, `users/${user?.uid}/listSnippets`)
  );

  return (
    <DashboardHandler loading={loading} error={error?.message}>
      {value &&
        value.docs.map((list) => (
          <ListCard
            key={list.id}
            list={list.data() as ListInfoType}
            userRole={list.data().roles[user!.uid]}
          />
        ))}
    </DashboardHandler>
  );
}

export default ListsDashboard;
