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

type UserData = {
  profile: DocumentSnapshot<DocumentData> | null;
  snippets: QuerySnapshot<DocumentData> | null;
};

export function useGetUserData(userID: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [userData, setUserData] = useState<UserData>({
    profile: null,
    snippets: null,
  });

  useEffect(() => {
    Promise.all([
      getDoc(doc(firestore, 'users', userID)),
      getDocs(collection(firestore, `users/${userID}/listSnippets`)),
    ])
      .then(([profile, snippets]) => {
        setUserData({ profile, snippets });
        setLoading(false);
      })
      .catch((error) => {
        setError(error as any);
      });
  }, [userID]);

  useEffect(() => {
    if (error) throw new Error('Error al cargar la pagina');
  }, [error]);

  return {
    loading,
    data: userData,
  };
}
