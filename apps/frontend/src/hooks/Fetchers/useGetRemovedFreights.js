import { useQuery } from 'react-query';
import QueryKeys from './queryKeys';
import { request } from '../../utils/axios';

const { GET_REMOVED_FREIGHTS } = QueryKeys;

function fetchRemovedFreights() {
  return request({ url: '/freights/removed', method: 'get' });
}

export function useGetRemovedFreights(onSuccess, onError) {
  return useQuery(GET_REMOVED_FREIGHTS, fetchRemovedFreights, {
    onSuccess,
    onError
  });
}
