import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { createResourceModalAtom } from '@/recoil/CreateResourceModalAtom';
import {
  EstateFormInfo,
  ListFormInfo,
  ResourceType,
} from '@/firebase/customTypes';

export const useCreateResourceModal = (type: ResourceType) => {
  const [modalState, setModalState] = useRecoilState(createResourceModalAtom);

  const closeModal = useCallback(
    () =>
      setModalState({ ...modalState, [type]: false, defaultValues: undefined }),
    [modalState, setModalState, type]
  );

  const openModal = useCallback(
    (
      action: 'create' | 'edit',
      defaultValues?: EstateFormInfo | ListFormInfo
    ) => setModalState({ ...modalState, [type]: true, defaultValues, action }),
    [modalState, setModalState, type]
  );

  return { modalState, closeModal, openModal };
};
