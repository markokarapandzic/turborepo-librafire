import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { request } from '../../utils/axios';
import Keys from './queryKeys';
import AppContext from '../../context';
import { showToast, toastSuccess, toastError } from '../../context/actions';

const { GET_TABLE_DATA } = Keys;

function deleteFreights(freightIds) {
  const body = {
    ids: freightIds
  };

  return request({ url: '/freights', method: 'delete', data: body });
}

export function useDeleteFreights() {
  const queryClient = useQueryClient();
  const [, dispatch] = useContext(AppContext);

  return useMutation(deleteFreights, {
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
