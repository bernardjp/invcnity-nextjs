import { UserCredential } from 'firebase/auth';
import { firestore } from './clientApp';
import { doc, setDoc } from 'firebase/firestore';
import { UserDoc } from './customTypes';

export async function createUserDocument(userData: UserCredential) {
  const { user } = userData;

  try {
    const userDoc: UserDoc = {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      providerData: user.providerData,
    };
    // Firestore expects a doc formatted as JSON.
    const convertedDoc = convertToJSON(userDoc);
    const userRef = doc(firestore, 'users', user.uid);

    await setDoc(userRef, convertedDoc);
  } catch (error) {
    console.log('createUser:', error);
  }
}

// NOTE:  - Firebase rules are not configured to accept this query.
//        - This requirement is no longer needed.
// export async function verifyUniqueUsername(username: string) {
//   const q = query(
//     collection(firestore, 'users'),
//     where('username', '==', username)
//   );
//   const userDocs = await getDocs(q);
//   return userDocs.empty;
// }

function convertToJSON(user: UserDoc) {
  return JSON.parse(JSON.stringify(user));
}
