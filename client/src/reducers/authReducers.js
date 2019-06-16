import { SET_CURRENT_USER, USER_LOADING } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
}

function authReduced(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.entries(action.payload).length > 0,
        user: action.payload
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default authReducer
