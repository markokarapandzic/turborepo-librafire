import {
  CLEAN_SELECTED_ITEM,
  HIDE_MODAL,
  REMOVE_EDIT_MODE,
  SET_EDIT_MODE,
  SET_SELECTED_ITEM,
  SHOW_MODAL,
  SHOW_TOAST,
  HIDE_TOAST,
  TOAST_SUCCESS,
  TOAST_ERROR
} from './actionTypes';

export const setSelectedItem = (data) => ({ type: SET_SELECTED_ITEM, payload: data });
export const cleanSelectedItem = { type: CLEAN_SELECTED_ITEM };
export const showModal = { type: SHOW_MODAL };
export const hideModal = { type: HIDE_MODAL };
export const setEditMode = { type: SET_EDIT_MODE };
export const removeEditMode = { type: REMOVE_EDIT_MODE };
export const showToast = { type: SHOW_TOAST };
export const hideToast = { type: HIDE_TOAST };
export const toastSuccess = { type: TOAST_SUCCESS };
export const toastError = { type: TOAST_ERROR };
