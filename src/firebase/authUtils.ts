import {
  UserCredential,
  deleteUser,
  getAuth,
  updateEmail,
  updateProfile,
} from 'firebase/auth';
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

export async function deleteUserAccount() {
  const user = getAuth().currentUser;
  if (!user) return;

  try {
    deleteUser(user);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserAccount(displayName: string, email: string) {
  const user = getAuth().currentUser;
  if (!user) return;

  try {
    if (displayName) updateProfile(user, { displayName });
    if (email) updateEmail(user, email);
  } catch (error) {
    console.log(error);
  }
}

function convertToJSON(user: UserDoc) {
  return JSON.parse(JSON.stringify(user));
}
