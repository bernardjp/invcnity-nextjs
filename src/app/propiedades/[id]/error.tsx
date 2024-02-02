'use client';
import DefaultError from '@/app/components/ErrorHandling/DefaultError';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function Error(props: ErrorProps) {
  const { error, reset } = props;
  return <DefaultError actionCallback={() => reset()} error={error} />;
}

export default Error;
