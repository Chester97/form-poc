import { Actions } from './const';

export function setFieldValue(dispatch, payload) {
  return dispatch({ type: Actions.FIELD_VALUES, payload });
}

export function setError(dispatch, payload) {
  return dispatch({type: Actions.ERRORS, payload});
}

export function setSuccess(dispatch, payload) {
  return dispatch({ type: Actions.SUCCESS, payload });
}

export function setCurrentOnChangeField(dispatch, payload) {
  return dispatch({ type: Actions.ON_CHANGE_CURRENT_FIELD, payload });
}

export function setSubmitDisable(dispatch) {
  return dispatch({ type: Actions.DISABLE_SUBMIT_BUTTON });
}

export function setAllFields(dispatch, payload) {
  return dispatch({ type: Actions.ALL_FIELDS, payload });
}

export function setOnValidAll(dispatch) {
  return dispatch({ type: Actions.ON_VALID_ALL });
}