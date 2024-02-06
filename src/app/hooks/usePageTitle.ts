import { useEffect } from 'react';

export function usePageTitle(name: string) {
  useEffect(() => {
    document.title = `IN/V - ${name}`;
  }, [name]);
}
