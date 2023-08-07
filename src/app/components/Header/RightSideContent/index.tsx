'use client';
import React from 'react';
import { User } from 'firebase/auth';
import Navbar from './Navbar';
import Dropdown from './Dropdown';

type PropsType = {
  user: User | null | undefined;
};

const RightSideContent: React.FC<PropsType> = (props: PropsType) => {
  const { user } = props;

  return (
    <>
      <Navbar user={user} />
      <Dropdown user={user} />
    </>
  );
};
export default RightSideContent;
