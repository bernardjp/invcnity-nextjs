import React from 'react';
import Link from 'next/link';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import { Button } from '@chakra-ui/button';

type Props = {
  url: string;
  children: React.ReactNode;
  variant: ThemeVariant;
};

function CustomLink(props: Props) {
  const { url, children, variant } = props;

  return (
    <Link href={url}>
      <Button variant={variant}>{children}</Button>
    </Link>
  );
}

export default CustomLink;
