import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAddEditForm } from '../../hooks/forms/useAddEditForm';
import AppContext from '../../context';

import './add-freight-form.scss';

function AddFreightForm() {
  const [state] = useContext(AppContext);
  const { editMode } = state;
  const [formik, isLoadingCreateFreight, isLoadingEditFreight] = useAddEditForm();

  return (
    <form onSubmit={formik.handleSubmit} className="addFreightInput">
      <div className="row">
        <TextField
          value={formik.values.name}
          label="Name"
          variant="outlined"
          className="input"
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
        />
        <TextField
          value={formik.values.type}
          label="Type"
          variant="outlined"
          className="input"
          type="text"
          name="type"
          id="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.type && formik.errors.type}
          helperText={formik.touched.type && formik.errors.type ? formik.errors.type : null}
        />
      </div>
      <div className="row">
        <TextField
          value={formik.values.weight}
          label="Weight"
          variant="outlined"
          className="input"
          type="number"
          name="weight"
          id="weight"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.weight && formik.errors.weight}
          helperText={formik.touched.weight && formik.errors.weight ? formik.errors.weight : null}
        />
        <TextField
          value={formik.values.destination}
          label="Destination"
          variant="outlined"
          className="input"
          type="text"
          name="destination"
          id="destination"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.destination && formik.errors.destination}
          helperText={formik.touched.destination && formik.errors.destination ? formik.errors.destination : null}
        />
      </div>
      <div className="row">
        <TextField
          value={formik.values.phoneNumber}
          label="Phone Number"
          variant="outlined"
          className="input"
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && formik.errors.phoneNumber}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : null}
        />
        <TextField
          value={formik.values.email}
          label="Email"
          variant="outlined"
          className="input"
          type="email"
          name="email"
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
        />
      </div>
      <LoadingButton
        loading={isLoadingCreateFreight || isLoadingEditFreight}
        type="submit"
        variant="contained"
        size="large"
      >
        {editMode ? 'EDIT' : 'ADD'}
      </LoadingButton>
    </form>
  );
}

export default AddFreightForm;
