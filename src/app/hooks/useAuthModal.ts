import { useRecoilState } from 'recoil';
import { authModalAtom } from '@/recoil/AuthModalAtom';

export const useAuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalAtom);

  const closeModal = () => setModalState((prev) => ({ ...prev, open: false }));
  const openModal = () => setModalState((prev) => ({ ...prev, open: true }));

  return { modalState, setModalState, closeModal, openModal };
};
