import React, { useRef } from 'react';
import { Image } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import CardIcon from './CardIcon';
import Link from 'next/link';

function CardAnchorIcon(props: {
  label: string;
  pageURL: string;
  type: 'publication' | 'location';
  variant: ThemeVariant;
}): React.ReactElement {
  const { label, pageURL, type, variant } = props;
  const linkRef = useRef<HTMLAnchorElement>(null);

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const linkElement = linkRef.current;
    linkElement?.click();
  };

  return (
    <CardIcon variant={variant} onClickHandler={onClickHandler} label={label}>
      <Link
        href={pageURL}
        ref={linkRef}
        style={{ display: 'none' }}
        target="_blank"
      ></Link>
      <Image src={`/icons/${type}-link.svg`} alt="" width="55%" />
    </CardIcon>
  );
}

export default CardAnchorIcon;
