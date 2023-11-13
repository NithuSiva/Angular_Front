import { Ticket } from '../models/ticket';
import { Major } from '../models/enum';
import { STUDENTS_MOCKED } from './student.mock';


const dateToday: Date = new Date();

export const TICKETS_MOCKED: Ticket[] = [
  {
    "title": 'SI4 in Madrid',
    "description": '',
    date: dateToday,
    "student": STUDENTS_MOCKED[0],
    "major": Major.SI,
    "archived": false
  },
  {
    "title": 'TEST',
    "description": 'Description du voyage',
    date: dateToday,
    "student": STUDENTS_MOCKED[1],
    "major": Major.GE,
    "archived": false
  },
];
