import { UserCredential } from 'firebase/auth';
import { firestore } from './clientApp';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { UserDoc } from './customTypes';

export async function createUserDocument(user: UserCredential) {
  try {
    const userDoc: UserDoc = {
      uid: user.user.uid,
      username: user.user.displayName,
      email: user.user.email,
      providerData: user.user.providerData,
    };
    // Firestore expects a doc formatted as JSON.
    const convertedDoc = convertToJSON(userDoc);

    const docRef = await addDoc(collection(firestore, 'users'), convertedDoc);
  } catch (error) {
    console.log('createUser:', error);
  }
}

export async function verifyUniqueUsername(username: string) {
  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username)
  );
  const userDocs = await getDocs(q);

  return userDocs.empty;
}

function convertToJSON(user: UserDoc) {
  return JSON.parse(JSON.stringify(user));
}
