import axios from 'axios';
import {API_URL} from '../../config/config';
import {ICreateSubject, ISubject} from './subject.interface';

export const addSubject = async (input: ICreateSubject, token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.post(`${API_URL}/createSubject`, input, headers);
};

export const loadSubjects = async (id: number, token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.get(`${API_URL}/getAllSubjectsByExam/${id}`, headers);
};

export const updateSubject = async (Subject: ISubject, token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.put(`${API_URL}/updateSubject`, Subject, headers);
};
export const deleteSubject = async (id: number, token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.delete(`${API_URL}/deleteSubject/${id}`, headers);
};