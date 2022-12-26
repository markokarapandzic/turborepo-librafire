import { useContext } from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import { useGetTableData } from '../../hooks/Fetchers/useGetTableData';
import AppContext from '../../context';
import { removeEditMode, showModal, hideModal } from '../../context/actions';

import AddFreightForm from '../../components/AddFreightForm';
import FreightTable from '../../components/Table';
import AppBar from '../../components/AppBar';

import './dashboard.scss';

function DashboardPage() {
  const { isLoading, data: tableData } = useGetTableData();
  const [state, dispatch] = useContext(AppContext);

  function openModal() {
    dispatch(removeEditMode);
    dispatch(showModal);
  }

  function closeModal() {
    dispatch(hideModal);
  }

  return (
    <>
      <AppBar />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="rootDashboard">
            <FreightTable data={tableData.data ?? []} />
          </div>
          <Fab className="fab" color="primary" aria-label="add" onClick={openModal}>
            <AddIcon />
          </Fab>
        </>
      )}
      <Modal className="modal" open={state.isModalShown} onClose={closeModal}>
        <AddFreightForm />
      </Modal>
    </>
  );
}

export default DashboardPage;
