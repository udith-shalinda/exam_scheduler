export interface ITimeTable {
    id?: number;
    subjectId: number;
    hallId: number;
    data: Date;
    start: Date;
    end: Date;
}