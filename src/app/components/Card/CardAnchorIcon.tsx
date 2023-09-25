import React, { useRef } from 'react';
import { Image } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';
import CardIcon from './CardIcon';
import Link from 'next/link';

function CardAnchorIcon(props: {
  pageURL: string;
  type: 'publication' | 'location';
  variant: ThemeVariant;
}): React.ReactElement {
  const { pageURL, type, variant } = props;
  const linkRef = useRef<HTMLAnchorElement>(null);

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const linkElement = linkRef.current;
    linkElement?.click();
  };

  return (
    <CardIcon variant={variant} onClickHandler={onClickHandler}>
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
