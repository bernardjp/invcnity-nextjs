import { firestore } from '@/firebase/clientApp';
import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useGetUserData(userID: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState<DocumentSnapshot<DocumentData> | null>(null);
  const [listSnippets, setListSnippets] =
    useState<QuerySnapshot<DocumentData> | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      getDoc(doc(firestore, 'users', userID)).then((data) => setUser(data));
      getDocs(collection(firestore, `users/${userID}/listSnippets`)).then(
        (data) => setListSnippets(data)
      );
    } catch (error) {
      setError(error as any);
    } finally {
      setLoading(false);
    }
  }, [userID]);

  return {
    loading,
    error,
    data: {
      user,
      listSnippets,
    },
  };
}
