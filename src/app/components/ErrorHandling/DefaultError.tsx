import React from 'react';
import ErrorHandling from '.';

type Props = {
  actionCallback: () => void;
  error?: Error & { digest?: string };
};

const ERROR_TEXT = {
  title: 'Something went wrong!',
  message:
    "Sorry for the inconvinience, we have some issues on our end. If you try again now and the issue isn't resolved please try again later.",
};

function DefaultError(props: Props) {
  const { actionCallback, error } = props;

  return (
    <ErrorHandling
      text={ERROR_TEXT}
      actionButton={{
        cb: actionCallback,
        text: 'Try Again',
      }}
      error={error}
    />
  );
}

export default DefaultError;
