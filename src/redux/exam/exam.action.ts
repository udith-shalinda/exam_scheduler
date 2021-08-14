import { IExam } from "../../services/exam/exam.interface"

export enum ExamActionTypes {
    'SET_EXAMS'= 'SET_EXAMS',
    'UPDATE_EXAM'= 'UPDATE_EXAM',
    'ADD_EXAM'= 'ADD_EXAM',
    'DELETE_EXAM'= 'DELETE_EXAM',
    'UPDATE_EXAM_LOADING'= 'UPDATE_EXAM_LOADING'
}

export const A_setExams = (Exam: IExam[])=>({
    type: ExamActionTypes.SET_EXAMS,
    payload: Exam,
})
export const A_updateExam = (Exam: IExam)=>({
    type: ExamActionTypes.UPDATE_EXAM,
    payload: Exam,
})
export const A_addExam = (Exam: IExam)=>({
    type: ExamActionTypes.ADD_EXAM,
    payload: Exam,
})
export const A_deleteExam = (id: number)=>({
    type: ExamActionTypes.DELETE_EXAM,
    payload: id,
})

export const A_updateExamLoading = (loading: boolean)=>({
    type: ExamActionTypes.UPDATE_EXAM_LOADING,
    payload: loading,
})