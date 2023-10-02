'use client';
import React from 'react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ExternalLinkIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useMultiStyleConfig,
  createStylesContext,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { deleteList } from '@/firebase/firestoreUtils';
import { listVariant } from '@/style/componentsStyleConfig';
import { ListType } from '@/firebase/customTypes';

type MenuItemProps = {
  icon: React.ReactElement;
  text: string;
  onClickHandler: () => void;
};

const [StylesProvider, useStyles] = createStylesContext('VariantMenu');

const TitleMenuItem = (props: MenuItemProps) => {
  const { icon, text, onClickHandler } = props;
  const styles = useStyles();

  return (
    <MenuItem
      icon={icon}
      borderRadius="8px"
      onClick={onClickHandler}
      sx={styles.item}
    >
      {text}
    </MenuItem>
  );
};

function TitleMenu() {
  const params = useParams();
  const [type, listID] = params.id.split('_');

  const [userCredentials] = useAuthState(auth);
  const userID = userCredentials?.uid;

  const variant = listVariant[type as ListType];
  const styles = useMultiStyleConfig('VariantMenu', { variant });

  const onEditHandler = () => {
    console.log('Editing List ID:', listID);
  };

  const onShareHandler = () => {
    console.log('Sharing List ID:', listID, 'from USER ID:', userID);
  };

  const onDeleteHandler = () => {
    try {
      if (!userID) throw new Error('User not authenticated');
      deleteList(listID, userID);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu placement="end-start">
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={
              isOpen ? (
                <ChevronLeftIcon fontSize="24px" />
              ) : (
                <ChevronRightIcon fontSize="24px" />
              )
            }
            border="1px solid"
            borderRadius="full"
            fontWeight="bold"
            transition="0.2s"
            variant="outline"
            sx={styles.button}
          />
          <MenuList
            bg="white"
            border="2px solid"
            borderRadius="18px"
            fontSize="1rem"
            px="5px"
            zIndex={6}
            sx={styles.list}
          >
            <StylesProvider value={styles}>
              <TitleMenuItem
                icon={<EditIcon />}
                text="Edit List"
                onClickHandler={onEditHandler}
              />
              <TitleMenuItem
                icon={<ExternalLinkIcon />}
                text="Share List"
                onClickHandler={onShareHandler}
              />
              <TitleMenuItem
                icon={<DeleteIcon />}
                text="Delete List"
                onClickHandler={onDeleteHandler}
              />
            </StylesProvider>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default TitleMenu;
