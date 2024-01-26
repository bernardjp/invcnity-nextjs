import React from 'react';
import styles from './style.module.css';

type Props = {
  citeText: string;
  children: React.ReactNode;
};

function UserComment(props: Props) {
  const { citeText, children } = props;

  return (
    <blockquote className={styles.blockquote}>
      <p className={styles.quote}>{children}</p>
      <cite className={styles.cite}>{citeText}</cite>
    </blockquote>
  );
}

export default UserComment;
