import { useSelector, useDispatch } from 'react-redux';
import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import { hideNotification } from 'src/redux/slices/noticationSlice';
import { RootState } from 'src/redux/rootReducer';

const Snackbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, message, type } = useSelector((state: RootState) => state.notifications); // Укажите тип вашего корневого состояния

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <MuiSnackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert elevation={6} variant="filled" onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
