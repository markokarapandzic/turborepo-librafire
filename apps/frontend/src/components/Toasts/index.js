import { forwardRef, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AppContext from '../../context';
import { hideToast } from '../../context/actions';
import { TOAST_STATE } from '../../constants';

// eslint-disable-next-line react/jsx-filename-extension, react/jsx-props-no-spreading
const Alert = forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

function Toasts() {
  const [state, dispatch] = useContext(AppContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideToast);
  };

  return (
    <Snackbar open={state.isToastShown} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={state.toastState === TOAST_STATE.SUCCESS ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {state.toastState === TOAST_STATE.SUCCESS ? 'Success' : 'Error'}
      </Alert>
    </Snackbar>
  );
}

export default Toasts;
