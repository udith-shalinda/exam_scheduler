import { IExam } from "../exam/exam.interface";

export interface IHall{
    id?: number;
    name: string;
    seats_count: number;
    examId: number;
    exam?: IExam;
    all_Av_Dates?: IAv_Date[];
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

export interface IAv_Date{
    id?: number;
    date: Date;
    hallId?: number;
    hall?: IHall;
    all_Av_Times: IAv_Time[];
}
export interface IAv_Time{
    id?: number;
    start: Date;
    end: Date;
    av_date_id?: number;
    av_Date?: IAv_Date;
}

export interface ITimeSlot{
    av_date_id?: number;
    hall_id: number;
    av_time_id?: number;
    name: string;
    seats_count: number;
    examId: number;
    date: string;
    start: string;
    end: string;
}