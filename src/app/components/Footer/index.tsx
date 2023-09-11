import React from 'react';
import styles from './styles.module.css';

export default function Footer(): React.ReactElement {
  return (
    <div className={styles.footer}>
      <div className={styles.content_wrapper}>
        Made with a lot of hard work by&nbsp;
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/juan-pablo-bernard/"
        >
          <b>JP Bernard</b>
        </a>
        &nbsp;{`\\\\`}&nbsp;All illustrations by&nbsp;
        <a
          className={styles.link}
          href="https://storyset.com/house"
          target="_blank"
        >
          <b>Storyset</b>
        </a>
      </div>
    </div>
  );
}
