import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import {
  ResourceType,
  createResourceModalAtom,
} from '@/recoil/CreateResourceModalAtom';

export const useCreateResourceModal = (type: ResourceType) => {
  const [modalState, setModalState] = useRecoilState(createResourceModalAtom);

  const closeModal = useCallback(
    () => setModalState({ ...modalState, [type]: false }),
    [modalState, setModalState, type]
  );

  const openModal = useCallback(
    () => setModalState({ ...modalState, [type]: true }),
    [modalState, setModalState, type]
  );

  return { modalState, closeModal, openModal };
};
