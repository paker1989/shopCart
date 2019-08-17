import { UPDATE_SORT } from './type';

export default (sort) => dispatch => {
  dispatch({
    type: UPDATE_SORT,
    payload: sort
  })
}