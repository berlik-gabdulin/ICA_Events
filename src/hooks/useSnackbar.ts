import { useDispatch } from 'react-redux';
import { showNotification } from 'src/redux/slices/noticationSlice';

const useSnackbar = () => {
  const dispatch = useDispatch();

  const showError = (message: string) => {
    dispatch(showNotification({ message, type: 'error' }));
  };

  const showSuccess = (message: string) => {
    dispatch(showNotification({ message, type: 'success' }));
    console.log('Success');
  };

  return { showError, showSuccess };
};

export default useSnackbar;
