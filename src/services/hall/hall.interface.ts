import { IExam } from "../exam/exam.interface";

export interface IHall{
    id?: number;
    name: string;
    seats_count: number;
    examId: number;
    exam?: IExam;
    all_Av_Dates?: any[];
}

export interface IHallAvDateTime{
    name: string;
    seats_count: number;
    date: Date;
    hall_id: number;
    av_date_id: number;
    start: Date;
    end: Date;
}