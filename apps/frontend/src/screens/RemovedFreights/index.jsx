import ResponsiveAppBar from '../../components/AppBar';
import RemovedFreightsTable from '../../components/RemovedFreightsTable';

import './remove-freights.scss';

function RemovedFreightsPage() {
  return (
    <>
      <ResponsiveAppBar />
      <div className="removeFreightsContent">
        <RemovedFreightsTable />
      </div>
    </>
  );
}

export default RemovedFreightsPage;
