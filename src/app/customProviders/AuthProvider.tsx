import React, { useEffect } from 'react';
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    // console.log('user', user);
    // if (!user) router.replace('/');
  }, [user, router]);

  return <>{children}</>;
}

export default AuthProvider;
