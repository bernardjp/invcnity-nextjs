import React from 'react';
import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

function ListsPageLayout(props: Props) {
  return <div className={styles.page}>{props.children}</div>;
}

export default ListsPageLayout;
