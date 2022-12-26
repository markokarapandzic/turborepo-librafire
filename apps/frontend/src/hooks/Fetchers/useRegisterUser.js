import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { request } from '../../utils/axios';
import AppContext from '../../context';
import { showToast, toastSuccess, toastError } from '../../context/actions';

function registerUser(user) {
  return request({ url: '/users/register', method: 'post', data: user });
}

export function useRegisterUser() {
  const navigate = useNavigate();
  const [, dispatch] = useContext(AppContext);

  return useMutation(registerUser, {
    onSuccess: (data) => {
      dispatch(toastSuccess);
      dispatch(showToast);
      localStorage.setItem('accessToken', data.data.accessToken);
      navigate('/dashboard');
    },
    onError: () => {
      dispatch(toastError);
      dispatch(showToast);
    }
  });
}
