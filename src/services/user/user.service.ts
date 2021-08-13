import axios from 'axios';
import {API_URL} from '../../config/config';
import {ILoginUser} from './user.interface';

export const login = async (input: ILoginUser) => {
  return await axios.post(`${API_URL}/login`, input);
};

export const register = () => {};
