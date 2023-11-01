import { formAlertAtom } from '@/recoil/FormAlertAtom';
import { useRecoilState } from 'recoil';

function useFormAlert() {
  const [alertState, setAlertState] = useRecoilState(formAlertAtom);

  const closeAlert = () =>
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  const openAlert = () => setAlertState((prev) => ({ ...prev, isOpen: true }));

  return { alertState, setAlertState, closeAlert, openAlert };
}

export default useFormAlert;
