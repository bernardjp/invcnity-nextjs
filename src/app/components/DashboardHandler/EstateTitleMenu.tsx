'use client';
import React from 'react';
import { CustomMenuItemProps, TitleMenu, TitleMenuItem } from './TitleMenu';
import { ListType, ResourceType } from '@/firebase/customTypes';
import { EditIcon, ExternalLinkIcon, DeleteIcon } from '@chakra-ui/icons';
import { useGetUserID } from '@/app/hooks/useGetUserID';
import { useVariantMultiStyle } from '@/app/hooks/useVariantStyle';
import { useDisableForm } from '@/app/hooks/useDisableForm';
import useFormAlert from '@/app/hooks/useFormAlert';
import { useRouter } from 'next/navigation';
import { deleteEstate } from '@/firebase/firestoreUtils';

type Props = {
  resource: ResourceType;
  type: ListType;
  estateID: string;
  listID: string;
};

function EstateTitleMenu(props: Props) {
  const { type, estateID, listID } = props;
  const userID = useGetUserID();
  const { styles } = useVariantMultiStyle('VariantMenu', type);

  const { isDisabled, toggleDisable } = useDisableForm();
  const { closeAlert, setAlertState } = useFormAlert();
  const router = useRouter();

  const onEditHandler = async () => {
    if (!isDisabled) {
      // If the 'edition mode' is active then close it and reset the form.
      const alertMessage = {
        isOpen: true,
        title: 'Close Edition Mode',
        dialog:
          "If you exit the Edition Mode your changes won't be saved. Are you sure you want to proceed?",
        submitHandler: () => {
          closeAlert();
          toggleDisable();
        },
      };
      setAlertState(alertMessage);
    } else {
      toggleDisable();
    }
  };

  const onShareHandler = () => {
    console.log('Sharing Estate ID:', estateID, 'from USER ID:', userID);
  };

  const onDeleteHandler = () => {
    try {
      if (!userID) throw new Error('User not authenticated');
      const alertMessage = {
        isOpen: true,
        title: 'Delete Estate',
        dialog:
          'Are you sure you want to delete this Estate? This action cannot be undone.',
        submitHandler: async () => {
          await deleteEstate(estateID, listID);
          closeAlert();
          router.replace(`/listas/${type}_${listID}`);
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
      text: isDisabled ? 'Edit Estate' : 'Close Edition',
      onClickHandler: onEditHandler,
    },
    {
      disabled: true,
      icon: <ExternalLinkIcon />,
      text: 'Share Estate',
      onClickHandler: onShareHandler,
    },
    {
      icon: <DeleteIcon />,
      text: 'Delete Estate',
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

export default EstateTitleMenu;
