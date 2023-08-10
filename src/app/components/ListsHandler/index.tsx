'use client';
import React from 'react';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignInHero from './SignInHero';
import Dashboard from './Dashboard';

function ListHandler(): React.ReactElement {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      {/* {loading && <div>Loading...</div>} */}
      {user && !loading ? <Dashboard user={user} /> : <SignInHero />}
      {error && <div>{error.message}</div>}
    </>
  );
}
export default ListHandler;
