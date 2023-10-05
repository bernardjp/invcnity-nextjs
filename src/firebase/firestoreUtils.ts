import { collection, doc, runTransaction } from 'firebase/firestore';
import { firestore } from './clientApp';
import { ListFormInfo, EstateFormInfo } from './customTypes';

// -- Unsued/Deprecated Implementation --
// function getListSnippets(
//   userID: string,
//   stateHandler: React.Dispatch<React.SetStateAction<ListFormInfo[]>>
// ) {
//   if (!userID) return;
//   const unsub = onSnapshot(
//     collection(firestore, `users/${userID}/listSnippets`),
//     (data) => {
//       let listSnippets: ListFormInfo[] = data.docs.map(
//         (list) => list.data() as ListFormInfo
//       );
//       stateHandler(listSnippets);
//     }
//   );
// }

export async function createEstate(estateData: EstateFormInfo) {
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

export async function createEstateList(listData: ListFormInfo, userID: string) {
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

export async function editList(
  updatedList: ListFormInfo,
  listID: string,
  userID: string
) {
  /* Edit process:
      2- Edit the List document itself.
      3- Edit the ListSnippet in each User associated with the List.
      console.log('Editing LIST ID:', listID, 'from USER ID:', userID);
   */

  await runTransaction(firestore, async (transaction) => {
    const listDocRef = doc(firestore, 'estate_lists', listID);
    transaction.update(listDocRef, {
      // Updated DATA.
      ...updatedList, // this updates ALL the fields, even those not changed.
    });

    const userDocRef = doc(firestore, `users/${userID}/listSnippets`, listID);
    transaction.update(userDocRef, {
      // Updated DATA.
      ...updatedList, // this updates ALL the fields, even those not changed.
    });
  });
}

export async function editEstate(
  updatedEstate: EstateFormInfo,
  estateID: string,
  listID: string
) {
  /* Edit process:
      2- Edit the ESTATE document itself.
      3- Edit the EstateSnippet in each associated List.
      console.log('Editing ESTATE ID:', estateID, 'from USER ID:', userID);
   */
  await runTransaction(firestore, async (transaction) => {
    const estateDocRef = doc(firestore, 'estates', estateID);
    transaction.update(estateDocRef, {
      // Updated DATA.
      ...updatedEstate, // this updates ALL the fields, even those not changed.
    });

    const listDocRef = doc(
      firestore,
      `estate_lists/${listID}/estateSnippets`,
      estateID
    );
    transaction.update(listDocRef, {
      // Updated DATA.
      ...updatedEstate, // this updates ALL the fields, even those not changed.
    });
  });
}

export function deleteList(listID: string, userID: string) {
  /* Delete process:
      1- Delete the EstateSnippets subcollection associated with the List. Alternativatly, delete all the Estate documents associated with the List. (All the Estates must have a reference to the Parent List).
        1.1- The deletion of collections and subcollection is meant to be done server-side.
        The implementation of a API router to handle DELETE request to that particular endpoint is needed. 
      2- Delete the List document itself.
      3- Delete the ListSnippet in each User associated with the List.
   */
  console.log('Deleting LIST ID:', listID, 'from USER ID:', userID);
}

export function deleteEstate(estateID: string, listID: string) {
  /* Delete process:
      1- Delete the EstateSnippet document from the associated List.
      2- Delete the Estate document itself.
   */
  console.log('Deleting ESTATE ID:', estateID, 'from USER ID:', listID);
}
