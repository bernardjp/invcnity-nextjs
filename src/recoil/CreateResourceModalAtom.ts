import { atom } from 'recoil';

export interface CreateResourceModal {
  list: boolean;
  estate: boolean;
}

const defaultModalState = {
  list: false,
  estate: false,
};

export const createResourceModalAtom = atom<CreateResourceModal>({
  key: 'createResourceModal',
  default: defaultModalState,
});
