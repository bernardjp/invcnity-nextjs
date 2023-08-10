import { UserInfo } from 'firebase/auth';

export type UserDoc = {
  uid: string;
  username: string | null;
  email: string | null;
  providerData: UserInfo[];
  // TO-Do: Add support to EstateList collection.
};

export type EstateListDoc = {
  /* *** */
};

export type EstateDoc = {
  /* *** */
};
