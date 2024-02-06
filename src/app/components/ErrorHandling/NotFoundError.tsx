'use client';
import React from 'react';
import ErrorHandling from '.';

type Props = {
  error?: Error & { digest?: string };
};

const ERROR_TEXT = {
  title: 'Something went wrong!',
  message:
    'The resource you are looking for do not exist or it has restricted access.',
};

function NotFoundError(props: Props) {
  const { error } = props;

  return <ErrorHandling text={ERROR_TEXT} error={error} />;
}

export default NotFoundError;
