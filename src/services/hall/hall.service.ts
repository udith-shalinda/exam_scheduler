import axios from 'axios';
import {API_URL} from '../../config/config';
import { IHall } from './hall.interface';

export const addHall = async (input: IHall, token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.post(`${API_URL}/createHall`, input, headers);
};

export const loadHalls = async (id: number, token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.get(`${API_URL}/getAllHallsByExam/${id}`, headers);
};

export const updateHall = async (Hall: IHall, token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.put(`${API_URL}/updateHall`, Hall, headers);
};
export const deleteHall = async (id: number, token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.delete(`${API_URL}/deleteHall/${id}`, headers);
};