'use client';
import React from 'react';
import { useMultiStyleConfig } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { listVariant } from '@/style/componentsStyleConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ListType } from '@/firebase/customTypes';
import { auth } from '@/firebase/clientApp';
import { CustomMenuItemProps, TitleMenu, TitleMenuItem } from './TitleMenu';
import useFormAlert from '@/app/hooks/useFormAlert';
import { useDisableForm } from '@/app/hooks/useDisableForm';

function UserTitleMenu(props: { type: ListType }) {
  const { type } = props;
  const [userCredentials] = useAuthState(auth);
  const userID = userCredentials?.uid;

  const variant = listVariant[type];
  const styles = useMultiStyleConfig('VariantMenu', { variant });

  const { isDisabled, toggleDisable } = useDisableForm();
  const { closeAlert, setAlertState } = useFormAlert();

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

  const onDeleteHandler = () => {
    try {
      if (!userID) throw new Error('User not authenticated');
      const alertMessage = {
        isOpen: true,
        title: 'Delete Account',
        dialog:
          'Are you sure you want to delete your Account? Every VCNITY and Estate created with this account will be permanently removed from our database. This action cannot be undone.',
        submitHandler: () => {
          // deleteUser(userID);
          console.log('user deleted');
          closeAlert();
        },
      };
      setAlertState(alertMessage);
    } catch (error) {
      console.log(error);
    }
  };

  const itemsData: Omit<CustomMenuItemProps, 'style'>[] = [
    {
      icon: <EditIcon />,
      text: isDisabled ? 'Edit Profile' : 'Close Edition',
      onClickHandler: onEditHandler,
    },
    {
      icon: <DeleteIcon />,
      text: 'Delete Account',
      onClickHandler: onDeleteHandler,
    },
  ];

  return (
    <TitleMenu styles={styles}>
      {itemsData.map((item: any) => (
        <TitleMenuItem
          key={item.text}
          icon={item.icon}
          style={styles.item}
          text={item.text}
          onClickHandler={item.onClickHandler}
        />
      ))}
    </TitleMenu>
  );
}

export default UserTitleMenu;
