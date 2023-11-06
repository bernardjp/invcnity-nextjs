'use client';
import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react';
import useFormAlert from '@/app/hooks/useFormAlert';

function FormAlert() {
  const { alertState, closeAlert } = useFormAlert();
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
        isOpen={alertState.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent borderRadius="24px" border="2px solid white">
          <AlertDialogHeader
            alignItems="center"
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            bg="brand.red"
            borderStartStartRadius="24px"
            borderStartEndRadius="24px"
            color="white"
          >
            {alertState.title}
            <AlertDialogCloseButton position="relative" top={0} right={0} />
          </AlertDialogHeader>
          <AlertDialogBody pt="1.5rem">{alertState.dialog}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              border="1px solid"
              borderColor="brand.red"
              borderRadius="full"
              color="brand.red"
              px={6}
              onClick={closeAlert}
              _hover={{
                bg: 'brand.lightRed',
              }}
              _active={{
                color: 'white',
                bg: 'brand.red',
              }}
            >
              No
            </Button>
            <Button
              borderRadius="full"
              bg="brand.red"
              color="white"
              ml={3}
              px={6}
              onClick={alertState.submitHandler}
              _hover={{
                bg: 'red',
              }}
              _active={{
                bg: 'brand.red',
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default FormAlert;
