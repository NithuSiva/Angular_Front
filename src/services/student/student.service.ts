import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, last } from 'rxjs';
import { STUDENTS_MOCKED } from 'src/mocks/student.mock';
import { Student } from 'src/models/student';

@Injectable({
    providedIn: 'root'
})

export class StudentService {

    private studentList: Student[] = STUDENTS_MOCKED;
    public students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);
    public url: string = "https://jsonplaceholder.typicode.com/users";
    private studentListApi: any;
    constructor(private _httpClient: HttpClient) {
        
    }

    public getApiAndClearStudent() {
        this._httpClient.get(this.url)
        .subscribe(data => {
            this.studentListApi= (<any>data);
            let newListStudent: { id: any; firstName: any; lastName: any; }[] = [];
            this.studentListApi.forEach((element: any) => {
                let temp = element['name'].split(' ');
                newListStudent.push({'id' :element['id'], 'firstName': temp[0], 'lastName': temp[1]});
                
            });
            this.students$.next(newListStudent);
        }
        );
    }
} 