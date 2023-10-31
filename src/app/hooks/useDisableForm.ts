import { useRecoilState } from 'recoil';
import { disabledFormAtom } from '@/recoil/DisableFormAtom';

export function useDisableForm() {
  const [isDisabled, setDisable] = useRecoilState(disabledFormAtom);
  const toggleDisable = () => setDisable((prev) => !prev);
  return { isDisabled, toggleDisable };
}
