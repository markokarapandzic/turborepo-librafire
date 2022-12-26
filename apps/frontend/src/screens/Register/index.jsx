import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { useRegisterForm } from '../../hooks/forms/useRegisterForm';

import './register.scss';

function RegisterPage() {
  const [formik, isLoading] = useRegisterForm();

  return (
    <div className="rootRegister">
      <form onSubmit={formik.handleSubmit} className="rootRegister__buttonBox">
        <TextField
          label="Email"
          variant="outlined"
          value={formik.values.email}
          className="input"
          type="text"
          name="email"
          id="email"
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={formik.values.password}
          className="input spaceTop"
          type="password"
          name="password"
          id="password"
          error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <LoadingButton loading={isLoading} type="submit" className="btn loginBtn spaceTop" variant="contained">
          Register
        </LoadingButton>
      </form>
    </div>
  );
}

export default RegisterPage;
