import { useRecoilState } from 'recoil';
import { authModalAtom, ViewType } from '@/recoil/AuthModalAtom';

export const useAuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalAtom);

  const closeModal = () => setModalState((prev) => ({ ...prev, open: false }));
  const openModal = (view: ViewType) => setModalState({ view, open: true });
  const changeView = (view: ViewType) =>
    setModalState((prev) => ({ ...prev, view }));

  return { modalState, changeView, closeModal, openModal };
};
