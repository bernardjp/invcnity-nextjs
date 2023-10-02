import {
  collection,
  doc,
  onSnapshot,
  runTransaction,
} from 'firebase/firestore';
import { firestore } from './clientApp';
import { ListFormInfo, EstateFormInfo } from './customTypes';

function getListSnippets(
  userID: string,
  stateHandler: React.Dispatch<React.SetStateAction<ListFormInfo[]>>
) {
  if (!userID) return;

  const unsub = onSnapshot(
    collection(firestore, `users/${userID}/listSnippets`),
    (data) => {
      let listSnippets: ListFormInfo[] = data.docs.map(
        (list) => list.data() as ListFormInfo
      );
      stateHandler(listSnippets);
    }
  );
}

async function createEstate(estateData: EstateFormInfo) {
  await runTransaction(firestore, async (transaction) => {
    const estateDocRef = doc(collection(firestore, 'estates'));
    transaction.set(estateDocRef, estateData);

    const listDocRef = doc(
      firestore,
      `estate_lists/${estateData.listID}/estateSnippets`,
      estateDocRef.id
    );
    transaction.set(listDocRef, estateData);
  });
}

async function createEstateList(listData: ListFormInfo, userID: string) {
  await runTransaction(firestore, async (transaction) => {
    const listDocRef = doc(collection(firestore, 'estate_lists'));
    transaction.set(listDocRef, listData);

    const userDocRef = doc(
      firestore,
      `users/${userID}/listSnippets`,
      listDocRef.id
    );
    transaction.set(userDocRef, listData);
  });
}

function deleteList(listID: string, userID: string) {
  /* Delete process:
      1- Delete the EstateSnippets subcollection associated with the List. Alternativatly, delete all the Estate documents associated with the List. (All the Estates must have a reference to the Parent List).
      2- Delete the List document itself.
      3- Delete the ListSnippet in each User associated with the List.
   */
  console.log('Deleting LIST ID:', listID, 'from USER ID:', userID);
}

function deleteEstate(estateID: string, listID: string) {
  /* Delete process:
      1- Delete the EstateSnippet document from the associated List.
      2- Delete the Estate document itself.
   */
}

export {
  getListSnippets,
  createEstate,
  createEstateList,
  deleteEstate,
  deleteList,
};
