import React from 'react';
import styles from './styles.module.css';

export default function Footer(): React.ReactElement {
  return (
    <div className={styles.footer}>
      <div className={styles.content_wrapper}>
        FOOTER{' '}
        <a href="https://storyset.com/house">All illustrations by Storyset</a>
      </div>
    </div>
  );
}
