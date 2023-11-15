import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, last } from 'rxjs';
import { STUDENTS_MOCKED } from 'src/mocks/student.mock';
import { Student } from 'src/models/student';

@Injectable({
    providedIn: 'root'
})

export class StudentService {

    private studentList: Student[] = [];

    public students$: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);

  
    public studentHasBeenAdded: EventEmitter<Student> = new EventEmitter<Student>();

    public url: string = "https://jsonplaceholder.typicode.com/users";
    private studentListApi: any;
    constructor(private _httpClient: HttpClient) {
        
    }

    getLastId(){
        return this.studentList.length;
    }

    getStudentsSubject() {
        return this.students$;
    }

    addStudent(student: Student) {
        // this.students$.value.push(student);
        this.studentList.push(student);
        this.students$.next(this.studentList);
      }

    async getApiAndClearStudent(): Promise<void>{
        try {
            await this._httpClient.get(this.url)
            .subscribe(data => {
                this.studentListApi= (<any>data);
                this.studentListApi.forEach((element: any) => {
                    let temp = element['name'].split(' ');
                    let newStudent: Student = {'id' :element['id'], 'firstName': temp[0], 'lastName': temp[1]};
                    this.studentList.push(newStudent);

                    
                });
                this.students$.next(this.studentList);
            }
            );
        } catch (error) {
            console.error("Erreur HTTP GET");
            throw error;
        }
    }
} 
