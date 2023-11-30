import { editEstate, editEstateList } from '@/firebase/firestoreUtils';
import { useDebouncedCallback, DebouncedState } from 'use-debounce';

export type SetFavoriteCB = DebouncedState<
  (
    snippetID: string,
    resourceID: string,
    isFavorite: boolean | undefined
  ) => void
>;

export function useFavoriteList(): SetFavoriteCB {
  return useDebouncedCallback(
    (userID: string, listID: string, isFavorite: boolean) => {
      editEstateList({ isFavorite }, listID, userID);
    },
    5000
  );
}

export function useFavoriteEstate(): SetFavoriteCB {
  return useDebouncedCallback(
    (listID: string, estateID: string, isFavorite: boolean) => {
      editEstate({ isFavorite }, estateID, listID);
    },
    5000
  );
}
