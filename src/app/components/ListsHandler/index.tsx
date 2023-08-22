'use client';
import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignInHero from './SignInHero';
import MainDashboard from './MainDashboard';
import { ListInfoType } from '../Modal/ListCreation/utils/validation';
import { getListSnippets } from '@/firebase/firestoreUtils';

function ListHandlerPage(): React.ReactElement {
  const [user, loading, error] = useAuthState(auth);
  const [listData, setListData] = useState<ListInfoType[]>([]);

  useEffect(() => {
    if (!user) return;
    // Setups a listener that catches changes to the store in real time.
    // This way the list updates dinamically.
    getListSnippets(user.uid, setListData);
  }, [user]);

  return (
    <>
      {user && !loading ? (
        <MainDashboard user={user} listSnippets={listData} />
      ) : (
        <SignInHero />
      )}
      {error && <div>{error.message}</div>}
    </>
  );
}
export default ListHandlerPage;
