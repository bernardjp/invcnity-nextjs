'use client';
import React from 'react';
import { useMultiStyleConfig } from '@chakra-ui/react';
import { EditIcon, ExternalLinkIcon, DeleteIcon } from '@chakra-ui/icons';
import { listVariant } from '@/style/componentsStyleConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ListFormInfo, ListType } from '@/firebase/customTypes';
import { deleteList, getEstateList } from '@/firebase/firestoreUtils';
import { auth } from '@/firebase/clientApp';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import { CustomMenuItemProps, TitleMenu, TitleMenuItem } from './TitleMenu';
import { useRouter } from 'next/navigation';
import useFormAlert from '@/app/hooks/useFormAlert';

type Props = {
  type: ListType;
  listID: string;
};

function ListTitleMenu(props: Props) {
  const { type, listID } = props;
  const [userCredentials] = useAuthState(auth);
  const userID = userCredentials?.uid;

  const variant = listVariant[type];
  const styles = useMultiStyleConfig('VariantMenu', { variant });

  const { openModal } = useCreateResourceModal('list');
  const { closeAlert, setAlertState } = useFormAlert();
  const router = useRouter();

  const onEditHandler = async () => {
    try {
      const listData = await getEstateList(listID);
      openModal('edit', listData as ListFormInfo);
    } catch (error) {
      console.log('onEditHandler', error);
    }
  };

  const onShareHandler = () => {
    console.log('Sharing List ID:', listID, 'from USER ID:', userID);
  };

  const onDeleteHandler = async () => {
    try {
      if (!userID) throw new Error('User not authenticated');
      const alertMessage = {
        isOpen: true,
        title: 'Delete List',
        dialog:
          'Are you sure you want to delete this Estate? Deleting the list will erase all the Estates stored in it. This action cannot be undone.',
        submitHandler: async () => {
          await deleteList(listID);
          closeAlert();
          router.replace('/listas');
        },
      };
      setAlertState(alertMessage);
    } catch (error) {
      closeAlert();
      console.log(error);
    }
  };

  const itemsData: Omit<CustomMenuItemProps, 'style'>[] = [
    {
      icon: <EditIcon />,
      text: 'Edit List',
      onClickHandler: onEditHandler,
    },
    {
      disabled: true,
      icon: <ExternalLinkIcon />,
      text: 'Share List',
      onClickHandler: onShareHandler,
    },
    {
      icon: <DeleteIcon />,
      text: 'Delete List',
      onClickHandler: onDeleteHandler,
    },
  ];

  return (
    <TitleMenu styles={styles}>
      {itemsData.map((item: any) => (
        <TitleMenuItem
          key={item.text}
          disabled={item.disabled}
          icon={item.icon}
          style={styles.item}
          text={item.text}
          onClickHandler={item.onClickHandler}
        />
      ))}
    </TitleMenu>
  );
}

export default ListTitleMenu;
