import { UserInfo } from 'firebase/auth';

export type ListType = 'apartment' | 'house' | 'countryside' | 'vacation';
export type RoleType = 'owner' | 'editor' | 'reader';
export type ListFormInfo = Omit<EstateListDoc, 'isVisited' | 'uid'>;
export type EstateFormInfo = Omit<
  EstateDoc,
  'isVisited' | 'isFavorite' | 'uid'
>;

export type UserDoc = {
  uid: string;
  username: string | null;
  email: string | null;
  providerData: UserInfo[];
  // TO-Do: Add support to EstateList collection.
};

export type EstateListDoc = {
  isFavorite?: boolean;
  listName: string;
  roles: { [x: string]: RoleType };
  type: ListType;
  uid: string;
};

export type EstateDoc = {
  estateName: string;
  isFavorite?: boolean;
  isVisited?: boolean;
  listID: string;
  location: string;
  locationURL: string;
  price: string;
  publicationURL: string;
  roles?: { [x: string]: RoleType };
  type: ListType;
  uid: string;
};
