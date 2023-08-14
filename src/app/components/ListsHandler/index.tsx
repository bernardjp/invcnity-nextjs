'use client';
import React from 'react';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignInHero from './SignInHero';
import MainDashboard from './MainDashboard';

function ListHandlerPage(): React.ReactElement {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      {user && !loading ? <MainDashboard user={user} /> : <SignInHero />}
      {error && <div>{error.message}</div>}
    </>
  );
}
export default ListHandlerPage;
