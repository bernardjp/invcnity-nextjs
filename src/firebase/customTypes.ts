import { UserInfo } from 'firebase/auth';

export type ListType = 'apartment' | 'house' | 'countryside' | 'vacation';
export type RoleType = 'owner' | 'editor' | 'reader';
export type ListInfoType = {
  id: string;
  listName: string;
  type: ListType;
  roles: { [x: string]: RoleType };
};

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
  uid: string;
  estateName: string;
  location: string;
  price: string;
  publicationURL: string;
  locationURL: string;
  type: ListType;
  isVisited?: boolean;
  isFavorite?: boolean;
  roles: { [x: string]: RoleType };
};
