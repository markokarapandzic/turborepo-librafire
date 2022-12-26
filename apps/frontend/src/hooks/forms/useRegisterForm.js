import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterUser } from '../Fetchers/useRegisterUser';

export function useRegisterForm() {
  const { mutate, isLoading } = useRegisterUser();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email Address').required('Required'),
      password: Yup.string().required('Password is required').min(8, 'Min 8 characters required')
    }),
    onSubmit: (values) => mutate(values)
  });

  return [formik, isLoading];
}
