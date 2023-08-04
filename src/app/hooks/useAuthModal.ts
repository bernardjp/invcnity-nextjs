import { useRecoilState } from 'recoil';
import { authModalAtom, ViewType } from '@/recoil/AuthModalAtom';
import { useCallback } from 'react';

export const useAuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalAtom);

  const closeModal = useCallback(
    () => setModalState((prev) => ({ ...prev, open: false })),
    [setModalState]
  );

  const openModal = useCallback(
    (view: ViewType) => setModalState({ view, open: true }),
    [setModalState]
  );

  const changeView = (view: ViewType) =>
    setModalState((prev) => ({ ...prev, view }));

  return { modalState, changeView, closeModal, openModal };
};
