import {Reducer} from 'redux';
import {IExam} from '../../services/exam/exam.interface';
import {ExamActionTypes} from './exam.action';

export interface IExamState {
  exams?: IExam[];
  loading: boolean;
}

const examReducer: Reducer<IExamState> = (
  state = {exams: [], loading: false},
  action,
) => {
  switch (action.type) {
    case ExamActionTypes.SET_EXAMS:
      return {
        ...state,
        exams: action.payload,
      };
    case ExamActionTypes.ADD_EXAM:
      return {
        ...state,
        exams: [state.exams, action.payload],
      };
    case ExamActionTypes.UPDATE_EXAM:
      return {
        ...state,
        exams: [state.exams?.filter((exam) => exam.id !== action.payload.id), action.payload]
      };
      case ExamActionTypes.DELETE_EXAM:
        return {
          ...state,
          exams: state.exams?.filter((exam) => exam.id !== action.payload)
        };
    default:
      return state;
  }
};

export default examReducer;
