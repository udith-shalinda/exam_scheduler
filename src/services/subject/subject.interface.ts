export interface ICreateSubject{
    name: string;
    mainYear: number;
    repeatedYears?: string;
    time: number;
    stu_count: number;
    examId: number;
}

export interface ISubject{
    id: number;
    name: string;
    mainYear: number;
    repeatedYears?: string;
    time: number;
    stu_count: number;
    examId: number;
}