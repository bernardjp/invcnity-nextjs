'use client';
import React from 'react';
import { Button } from '@chakra-ui/react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';

function CreateResourceButton(props: { type: 'estate' | 'list' }) {
  const { type } = props;
  const { openModal } = useCreateResourceModal(type);

  return (
    <div>
      <Button
        bg="linear-gradient(70deg, rgb(255, 178, 43) 10%, rgb(255, 113, 97) 38%, rgb(255, 113, 97) 62%, rgb(0, 180, 111) 85%)"
        border="2px solid white"
        borderRadius="3rem"
        boxShadow="2px 5px 13px -5px rgba(0, 0, 0, 0.5)"
        color="brand.chocolate"
        fontWeight="bold"
        height="auto"
        padding="0.5rem"
        transition="0.15s"
        _hover={{
          transform: 'scale(1.02)',
        }}
        onClick={() => openModal('create')}
      >
        <span
          style={{
            backgroundColor: 'white',
            padding: '0.7rem 1.1rem',
            borderRadius: '24px',
          }}
        >
          New {type === 'estate' ? 'Estate' : 'VCNITY'}
        </span>
      </Button>
    </div>
  );
}

export default CreateResourceButton;
