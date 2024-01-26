import React from 'react';
import styles from './style.module.css';
import Image from 'next/image';

type Props = {
  image: { url: string; alt: string };
  first?: boolean;
  side: 'Right' | 'Left';
  title: string;
  children: React.ReactNode;
};

function InfoSnippet(props: Props) {
  const { image, first, side, title, children } = props;

  return (
    <article className={styles[`itemWrapper${side}`]}>
      <div className={styles.imageContainer}>
        <Image src={image.url} alt={image.alt} width={520} height={10} />
      </div>
      <div className={styles[`textWrapper${side}`]}>
        {!first && (
          <span className={styles[`arrow${side}`]}>
            <span className={styles[`topPoint${side}`]}></span>
            <span className={styles[`bottomPoint${side}`]}></span>
          </span>
        )}
        <div className={styles[`textContainer${side}`]}>
          <div className={styles.titleContainer}>
            <h3 className={styles.secondaryTitle}>{title}</h3>
            <span className={styles.secondaryTitleUnderline}></span>
          </div>
          <p className={styles.text}>{children}</p>
        </div>
      </div>
    </article>
  );
}

export default InfoSnippet;
