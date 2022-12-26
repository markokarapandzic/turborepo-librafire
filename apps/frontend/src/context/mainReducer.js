/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import produce from 'immer';
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
import { TOAST_STATE } from '../constants';

export const initialState = {
  selectedItem: null,
  editMode: false,
  isModalShown: false,
  isToastShown: false,
  toastState: TOAST_STATE.SUCCESS
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case SET_SELECTED_ITEM:
      draft.selectedItem = action.payload;
      break;
    case CLEAN_SELECTED_ITEM:
      draft.selectedItem = null;
      break;
    case SHOW_MODAL:
      draft.isModalShown = true;
      break;
    case HIDE_MODAL:
      draft.isModalShown = false;
      break;
    case SET_EDIT_MODE:
      draft.editMode = true;
      break;
    case REMOVE_EDIT_MODE:
      draft.editMode = false;
      break;
    case SHOW_TOAST:
      draft.isToastShown = true;
      break;
    case HIDE_TOAST:
      draft.isToastShown = false;
      break;
    case TOAST_SUCCESS:
      draft.toastState = TOAST_STATE.SUCCESS;
      break;
    case TOAST_ERROR:
      draft.toastState = TOAST_STATE.ERROR;
      break;
  }

  return draft;
});
