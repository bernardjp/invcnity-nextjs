'use client';
import ErrorHandling from '../components/ErrorHandling';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function Error(props: ErrorProps) {
  const { error, reset } = props;
  return <ErrorHandling actionCallback={() => reset()} error={error} />;
}

export default Error;
