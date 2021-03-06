import axios from 'axios';
import {API_URL} from '../../config/config';
import {ILoginUser, ISignUpUser} from './user.interface';

export const login = async (input: ILoginUser) => {
  return await axios.post(`${API_URL}/login`, input);
};

export const register =async (input: ISignUpUser) => {
  return await axios.post(`${API_URL}/register`, input);
};

export const whoAmI =async (token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.get(`${API_URL}/whoAmI`, headers);
};