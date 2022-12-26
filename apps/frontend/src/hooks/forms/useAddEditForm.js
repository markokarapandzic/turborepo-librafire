import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateFreight } from "../Fetchers/useCreateFreight";
import { useEditFreight } from "../Fetchers/useEditFreight";
import AppContext from "../../context";
import { hideModal } from "../../context/actions";

function setEditValues(formik, selectedItem) {
  formik.setFieldValue("name", selectedItem.name);
  formik.setFieldValue("type", selectedItem.type);
  formik.setFieldValue("weight", selectedItem.weight);
  formik.setFieldValue("destination", selectedItem.destination);
  formik.setFieldValue("phoneNumber", selectedItem.phoneNumber);
  formik.setFieldValue("email", selectedItem.email);
}

export function useAddEditForm() {
  const [state, dispatch] = useContext(AppContext);
  const { editMode, selectedItem } = state;

  const { mutate: createFreightMutation, isLoading: isLoadingCreateFreight } =
    useCreateFreight();
  const { mutate: editFreightMutation, isLoading: isLoadingEditFreight } =
    useEditFreight();
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      weight: 0,
      destination: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email Address").required("Required"),
      name: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
      weight: Yup.number().required("Required"),
      destination: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      if (editMode) {
        const data = {
          ...values,
          _id: selectedItem._id,
        };
        await editFreightMutation(data);
      } else {
        await createFreightMutation(values);
      }
      dispatch(hideModal);
    },
  });

  useEffect(() => {
    if (editMode) {
      setEditValues(formik, selectedItem);
    }
  }, []);

  return [formik, isLoadingCreateFreight, isLoadingEditFreight];
}
