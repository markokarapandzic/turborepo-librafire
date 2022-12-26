import { useQuery } from 'react-query';
import QueryKeys from './queryKeys';
import { request } from '../../utils/axios';

const { GET_TABLE_DATA } = QueryKeys;

function fetchTableData() {
  return request({ url: '/freights', method: 'get' });
}

export function useGetTableData(onSuccess, onError) {
  return useQuery(GET_TABLE_DATA, fetchTableData, {
    onSuccess,
    onError
  });
}
