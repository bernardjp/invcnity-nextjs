import { EstateFormInfo, ListFormInfo } from '@/firebase/customTypes';
import { atom } from 'recoil';

export interface CreateResourceModal {
  list: boolean;
  estate: boolean;
  defaultValues?: ListFormInfo | EstateFormInfo;
  action: 'create' | 'edit';
}

const defaultModalState: CreateResourceModal = {
  list: false,
  estate: false,
  action: 'create',
};

export const createResourceModalAtom = atom<CreateResourceModal>({
  key: 'createResourceModal',
  default: defaultModalState,
});
