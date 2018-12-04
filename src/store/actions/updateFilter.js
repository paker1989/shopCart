import { UPDATE_FILTER } from './type';

export default (filters) => dispatch => {
  dispatch({
    type: UPDATE_FILTER,
    payload: filters
  })
}