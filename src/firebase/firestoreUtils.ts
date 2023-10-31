import {
  Transaction,
  WriteBatch,
  collection,
  doc,
  getDoc,
  runTransaction,
  writeBatch,
} from 'firebase/firestore';
import { firestore } from './clientApp';
import { ListFormInfo, EstateFormInfo } from './customTypes';

export async function createEstate(estateData: EstateFormInfo) {
  await runTransaction(firestore, async (transaction) => {
    const estateDocRef = createEstateDoc(transaction, estateData);
    createEstateSnippet(transaction, estateDocRef.id, estateData);
  });
}

export async function createEstateList(listData: ListFormInfo, userID: string) {
  await runTransaction(firestore, async (transaction) => {
    const listRef = createListDoc(transaction, listData);
    createListSnippet(transaction, userID, listRef.id, listData);
  });
}

export async function getEstateList(listID: string) {
  const listDocRef = doc(firestore, 'estate_lists', listID);
  const docSnapshot = await getDoc(listDocRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    throw new Error("The list doesn't exist.");
  }
}

export async function getEstate(estateID: string) {
  const estateDocRef = doc(firestore, 'estates', estateID);
  const docSnapshot = await getDoc(estateDocRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    throw new Error("The estate doesn't exist.");
  }
}

export async function editEstateList(
  updatedList: ListFormInfo,
  listID: string,
  userID: string
) {
  await runTransaction(firestore, async (transaction) => {
    updateListDoc(transaction, listID, updatedList);
    updateListSnippet(transaction, userID, listID, updatedList);
  });
}

export async function editEstate(
  updatedEstate: EstateFormInfo,
  estateID: string,
  listID: string
) {
  await runTransaction(firestore, async (transaction) => {
    updateEstateDoc(transaction, estateID, updatedEstate);
    updateEstateSnippet(transaction, estateID, listID, updatedEstate);
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

export async function deleteEstate(estateID: string, listID: string) {
  const batch = writeBatch(firestore);
  deleteEstateDoc(batch, estateID);
  deleteEstateSnippet(batch, estateID, listID);
  await batch.commit();
}

function createEstateDoc(transaction: Transaction, estateData: EstateFormInfo) {
  const estateDocRef = doc(collection(firestore, 'estates'));
  transaction.set(estateDocRef, estateData);
  //  We need to return the document reference becauseit's ID is needed
  //  to create the EstateSnippet later on the transaction.
  return estateDocRef;
}

function createEstateSnippet(
  transaction: Transaction,
  estateID: string,
  estateData: EstateFormInfo
) {
  const estateSnippetDocRef = doc(
    firestore,
    `estate_lists/${estateData.listID}/estateSnippets`,
    estateID
  );
  transaction.set(estateSnippetDocRef, estateData);
}

function createListDoc(transaction: Transaction, listData: ListFormInfo) {
  const listDocRef = doc(collection(firestore, 'estate_lists'));
  transaction.set(listDocRef, listData);
  //  We need to return the document reference becauseit's ID is needed
  //  to create the ListSnippet later on the transaction.
  return listDocRef;
}

function createListSnippet(
  transaction: Transaction,
  userID: string,
  listID: string,
  listData: ListFormInfo
) {
  const userDocRef = doc(firestore, `users/${userID}/listSnippets`, listID);
  transaction.set(userDocRef, listData);
}

function updateEstateDoc(
  transaction: Transaction,
  estateID: string,
  updatedEstate: EstateFormInfo
) {
  const estateDocRef = doc(firestore, 'estates', estateID);
  transaction.update(estateDocRef, {
    ...updatedEstate, // NOTE: this updates ALL the fields, even those not changed.
  });
}

function updateEstateSnippet(
  transaction: Transaction,
  estateID: string,
  listID: string,
  updatedEstate: EstateFormInfo
) {
  const estateSnippetDocRef = doc(
    firestore,
    `estate_lists/${listID}/estateSnippets`,
    estateID
  );
  transaction.update(estateSnippetDocRef, {
    ...updatedEstate, // NOTE: this updates ALL the fields, even those not changed.
  });
}

function updateListDoc(
  transaction: Transaction,
  listID: string,
  updatedList: ListFormInfo
) {
  const listDocRef = doc(firestore, 'estate_lists', listID);
  transaction.update(listDocRef, {
    ...updatedList, // NOTE: this updates ALL the fields, even those not changed.
  });
}

function updateListSnippet(
  transaction: Transaction,
  userID: string,
  listID: string,
  updatedList: ListFormInfo
) {
  const userDocRef = doc(firestore, `users/${userID}/listSnippets`, listID);
  transaction.update(userDocRef, {
    ...updatedList, // NOTE: this updates ALL the fields, even those not changed.
  });
}

function deleteEstateDoc(batch: WriteBatch, estateID: string) {
  const estateDocRef = doc(firestore, 'estates', estateID);
  batch.delete(estateDocRef);
}

function deleteEstateSnippet(
  batch: WriteBatch,
  estateID: string,
  listID: string
) {
  const docRef = doc(
    firestore,
    `estate_lists/${listID}/estateSnippets`,
    estateID
  );
  batch.delete(docRef);
}

function deleteListDoc() {}

function deleteListSnippet(batch: WriteBatch, listID: string, userID: string) {
  const docRef = doc(firestore, `users/${userID}/listSnippets`, listID);
  batch.delete(docRef);
}
