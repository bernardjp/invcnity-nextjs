import {
  Transaction,
  WriteBatch,
  collection,
  doc,
  getDoc,
  getDocs,
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
  updatedList: Partial<ListFormInfo>,
  listID: string,
  userID: string
) {
  await runTransaction(firestore, async (transaction) => {
    updateListDoc(transaction, listID, updatedList);
    updateListSnippet(transaction, userID, listID, updatedList);
  });
}

export async function editEstate(
  updatedEstate: Partial<EstateFormInfo>,
  estateID: string,
  listID: string
) {
  await runTransaction(firestore, async (transaction) => {
    updateEstateDoc(transaction, estateID, updatedEstate);
    updateEstateSnippet(transaction, estateID, listID, updatedEstate);
  });
}

export async function deleteList(listID: string, optionalBatch?: WriteBatch) {
  const batch = optionalBatch || writeBatch(firestore);
  const estateSnippetsRef = collection(
    firestore,
    `estate_lists/${listID}/estateSnippets`
  );
  const snippetsSnapshot = await getDocs(estateSnippetsRef);

  if (!snippetsSnapshot.empty) {
    snippetsSnapshot.forEach((doc) => {
      // 1- Delete the EstateSnippets subcollection associated with the List.
      deleteEstateSnippet(batch, doc.id, listID);
      // 2- Delete the Estate Document
      deleteEstateDoc(batch, doc.id);
    });
  }

  // 3.1- Gets all the ids from the users that have access to the list.
  const listRef = doc(firestore, `estate_lists/${listID}`);
  const listDoc = await getDoc(listRef);
  const users = Object.keys(listDoc.get('roles'));
  // 3.2- Delete the ListSnippet in each User associated with the List.
  users.forEach((userID) => {
    deleteListSnippet(batch, listID, userID);
  });

  // 4- Delete the List document itself.
  deleteListDoc(batch, listID);

  await batch.commit();
}

export async function deleteEstate(estateID: string, listID: string) {
  const batch = writeBatch(firestore);
  deleteEstateDoc(batch, estateID);
  deleteEstateSnippet(batch, estateID, listID);
  await batch.commit();
}

export async function deleteUserData(userID: string) {
  const batch = writeBatch(firestore);
  const listSnippetsRef = collection(
    firestore,
    `/users/${userID}/listSnippets`
  );
  const listSnippetsSnapshot = await getDocs(listSnippetsRef);

  if (!listSnippetsSnapshot.empty) {
    listSnippetsSnapshot.forEach(async (doc) => {
      // 1- Delete the ListSnippets subcollection associated with the List.
      deleteListSnippet(batch, doc.id, userID);
      // 2- Delete the List Document
      await deleteList(doc.id, batch);
    });
  }

  // 3- Delete the User Document
  deleteUserDoc(batch, userID);

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
    `estate_lists/${estateData.listData.id}/estateSnippets`,
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
  updatedEstate: Partial<EstateFormInfo>
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
  updatedEstate: Partial<EstateFormInfo>
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
  updatedList: Partial<ListFormInfo>
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
  updatedList: Partial<ListFormInfo>
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

function deleteListDoc(batch: WriteBatch, listID: string) {
  const listDocRef = doc(firestore, 'estate_lists', listID);
  batch.delete(listDocRef);
}

function deleteListSnippet(batch: WriteBatch, listID: string, userID: string) {
  const snippetDocRef = doc(firestore, `users/${userID}/listSnippets`, listID);
  batch.delete(snippetDocRef);
}

function deleteUserDoc(batch: WriteBatch, userID: string) {
  const userDocRef = doc(firestore, 'users', userID);
  batch.delete(userDocRef);
}
