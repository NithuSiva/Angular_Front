import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STUDENTS_MOCKED } from 'src/mocks/student.mock';
import { Student } from 'src/models/student';

@Injectable({
    providedIn: 'root'
})

export class StudentService {

    private studentList: Student[] = STUDENTS_MOCKED;
    public students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);

    constructor() {
    }

} 