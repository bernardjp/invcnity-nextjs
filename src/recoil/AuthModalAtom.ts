import { atom } from 'recoil';

export type ViewType = 'login' | 'signup' | 'resetPassword';

export interface AuthModalState {
  open: boolean;
  view: ViewType;
}

const defaultModalState: AuthModalState = {
  open: false,
  view: 'login',
};

export const authModalAtom = atom<AuthModalState>({
  key: 'authModal',
  default: defaultModalState,
});
