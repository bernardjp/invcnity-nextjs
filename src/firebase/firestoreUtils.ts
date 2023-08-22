import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from './clientApp';
import { ListInfoType } from '@/app/components/Modal/ListCreation/utils/validation';

function getListSnippets(
  userID: string,
  stateHandler: React.Dispatch<React.SetStateAction<ListInfoType[]>>
) {
  if (!userID) return;

  const unsub = onSnapshot(
    collection(firestore, `users/${userID}/listSnippets`),
    (data) => {
      let listSnippets: ListInfoType[] = data.docs.map(
        (list) => list.data() as ListInfoType
      );
      stateHandler(listSnippets);
    }
  );
}

export { getListSnippets };
