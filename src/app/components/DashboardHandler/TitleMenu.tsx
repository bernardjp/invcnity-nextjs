'use client';
import React from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  SystemStyleObject,
} from '@chakra-ui/react';

export type CustomMenuItemProps = {
  disabled?: boolean;
  icon: React.ReactElement;
  text: string;
  style: SystemStyleObject;
  onClickHandler: () => void;
};

const TitleMenuItem = (props: CustomMenuItemProps) => {
  const { disabled, icon, style, text, onClickHandler } = props;
  return (
    <MenuItem
      icon={icon}
      borderRadius="8px"
      onClick={onClickHandler}
      sx={style}
      isDisabled={disabled}
    >
      {text}
    </MenuItem>
  );
};

function TitleMenu(props: {
  children: React.ReactNode;
  styles: Record<string, SystemStyleObject>;
}) {
  const { children, styles } = props;

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
            {children}
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export { TitleMenu, TitleMenuItem };
