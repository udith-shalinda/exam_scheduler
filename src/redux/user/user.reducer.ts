import {Reducer} from 'redux';
import {IUser, UserActionTypes} from './user.action';

export interface IUserState {
  user?: IUser;
  token?: string;
  loading: boolean;
}

const userReducer: Reducer<IUserState> = (
  state = {user: undefined, token: undefined, loading: false},
  action,
) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:        
      return {
        ...state,
        user: action.payload,
      };
    case UserActionTypes.SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case UserActionTypes.UPDATE_USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
