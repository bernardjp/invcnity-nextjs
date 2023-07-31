import { atom } from 'recoil';

export interface AuthModalState {
  open: boolean;
  view: 'login' | 'signup' | 'resetPassword';
}

const defaultModalState: AuthModalState = {
  open: false,
  view: 'login',
};

export const authModalAtom = atom<AuthModalState>({
  key: 'authModal',
  default: defaultModalState,
});
