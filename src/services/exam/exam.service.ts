import axios from 'axios';
import {API_URL} from '../../config/config';
import {ICreateExam} from './exam.interface';

export const addExam = async (input: ICreateExam, token: string) => {
  const headers = {
    headers: {
      Authorization: token
    }
  };
  return await axios.post(`${API_URL}/createExam`, input, headers);
};

export const loadExams = async (token: string) => {
    const headers = {
      headers: {
        Authorization: token
      }
    };
    return await axios.get(`${API_URL}/getAllExams`, headers);
  };
  