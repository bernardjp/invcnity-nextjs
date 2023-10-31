import { atom } from 'recoil';

const defaultDisabledState = true;

export const disabledFormAtom = atom<boolean>({
  key: 'disableForm',
  default: defaultDisabledState,
});
