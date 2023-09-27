import React from 'react';
import { Tooltip } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';

type Props = {
  label: string;
  variant: ThemeVariant;
  children: React.ReactNode;
};

function CardTooltip(props: Props) {
  const { label, variant, children } = props;
  return (
    <Tooltip variant={variant} label={label} placement="top">
      {children}
    </Tooltip>
  );
}

export default CardTooltip;
