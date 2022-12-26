import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { request } from '../../utils/axios';
import Keys from './queryKeys';
import AppContext from '../../context';
import { showToast, toastSuccess, toastError } from '../../context/actions';

const { GET_TABLE_DATA } = Keys;

function createFreight(freight) {
  return request({ url: '/freights', method: 'post', data: freight });
}

export function useCreateFreight() {
  const queryClient = useQueryClient();
  const [, dispatch] = useContext(AppContext);

  return useMutation(createFreight, {
    onSuccess: () => {
      dispatch(toastSuccess);
      dispatch(showToast);
      queryClient.invalidateQueries(GET_TABLE_DATA);
    },
    onError: () => {
      dispatch(toastError);
      dispatch(showToast);
    }
  });
}
