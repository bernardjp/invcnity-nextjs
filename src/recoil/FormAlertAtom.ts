import { atom } from 'recoil';

export type AlertState = {
  isOpen: boolean;
  title: string;
  dialog: string;
  submitHandler: () => void;
};

const defaultAlertState: AlertState = {
  isOpen: false,
  title: '',
  dialog: '',
  submitHandler: () => {},
};

export const formAlertAtom = atom<AlertState>({
  key: 'formAlert',
  default: defaultAlertState,
});
