export interface ITimeTable {
    id?: number;
    subjectId: number;
    examId: number;
    hallId: number;
    data: Date;
    start: Date;
    end: Date;
}