import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useGetUserID() {
  const [userCredentials] = useAuthState(auth);
  return userCredentials?.uid;
}
