import {ITimeSlot} from '../hall/hall.interface';
import {ISubject} from '../subject/subject.interface';
import {ITimeTable} from './TimeTable.interface';
import axios from 'axios';
import {API_URL} from '../../config/config';

export const generateTimeTableFromData = (
  allSubjects: ISubject[],
  allTimeSlots: ITimeSlot[],
) => {
  console.log(allTimeSlots);
  
  const timeTable: ITimeTable[] = [];
  const daysBetweenExams = 1;

  const yearsLastExamDate = [
    {
      year: 1,
      lastDate: new Date('2021/08/04'),
    },
    {
      year: 2,
      lastDate: new Date('2021/08/04'),
    },
    {
      year: 3,
      lastDate: new Date('2021/08/04'),
    },
    {
      year: 4,
      lastDate: null,
    },
  ];

  allSubjects.map((subject: any) => {
    let possibleDate: any = null;
    let subjectYears: any[] = subject.repeatedYears.split(',').map(Number);
    subjectYears.push(subject.mainYear);
    subject.subjectId = subject.id;
    // console.log(subjectYears);
    // get last possible date for the exams
    subjectYears.forEach((year: any) => {
      yearsLastExamDate.forEach((lastExam: any) => {
        if (+year === lastExam.year) {
          if (!lastExam.lastDate && !possibleDate) {
            possibleDate = new Date(new Date().toISOString().slice(0, 10));
          } else if (lastExam.lastDate && !possibleDate) {
            let temp = new Date();
            possibleDate = new Date(
              new Date(
                temp.setDate(lastExam.lastDate.getDate() + daysBetweenExams),
              )
                .toISOString()
                .slice(0, 10),
            );
          } else if (
            lastExam.lastDate &&
            possibleDate &&
            possibleDate - lastExam.lastDate >
              daysBetweenExams * 24 * 60 * 60 * 1000
          ) {
            possibleDate = new Date(
              new Date(
                possibleDate.setDate(
                  lastExam.lastDate.getDate() + daysBetweenExams,
                ),
              )
                .toISOString()
                .slice(0, 10),
            );
          }
        }
      });
    });
    console.log(possibleDate);

    allTimeSlots.forEach((timeSlot: any) => {
      // console.log(timeSlot)
      if (timeSlot.seats_count >= subject.stu_count) {
        const hourDiff =
          (new Date(timeSlot.end).getTime() -
            new Date(timeSlot.start).getTime()) /
          1000 /
          60 /
          60;
          if (
            // @ts-ignore
          new Date(timeSlot.date) - possibleDate >= 0 &&
          subject.time <= hourDiff &&
          !subject.hallId
        ) {
          (subject.hallId = timeSlot.hall_id),
            (subject.start = timeSlot.start),
            (subject.end = timeSlot.start + subject.time);
            subject.date = timeSlot.date

          timeSlot.start = timeSlot.start + subject.time;

          // upate last exam date
          subjectYears.forEach((year: any) => {
            yearsLastExamDate.forEach((lastExam: any) => {
              if (
                +year === lastExam.year &&
                (!lastExam.lastDate || lastExam.lastDate - timeSlot.date <= 0)
              ) {
                lastExam.lastDate = timeSlot.date;
                // console.log(lastExam)
              }
            });
          });
          return;
        }
      }
    });
  });
  console.log(allSubjects);
  return allSubjects;
};


export const addTimeTable = async (input: ITimeTable[], token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.post(`${API_URL}/createTimeTable`, input, headers);
};

export const getAllTimeTableByExam = async (id: number, token: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.get(`${API_URL}/getAllTimeTablesByExam/${id}`, headers);
};