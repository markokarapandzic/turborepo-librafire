import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import { useGetRemovedFreights } from '../../hooks/Fetchers/useGetRemovedFreights';

import './removed-freights-table.scss';

export default function RemovedFreightsTable() {
  const { isLoading, data } = useGetRemovedFreights();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper} className="tableContainer">
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className="tableContainer__table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Date Removed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data &&
            data.data.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.weight}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
