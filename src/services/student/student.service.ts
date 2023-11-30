import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError  } from 'rxjs';
import { STUDENTS_MOCKED } from 'src/mocks/student.mock';
import { Student } from 'src/models/student';
// import { TicketService } from '../ticket/ticket.service';


@Injectable({
    providedIn: 'root'
})

export class StudentService {

    public studentList: Student[] = [];

    public students$: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);

    public studentHasBeenAdded: EventEmitter<Student> = new EventEmitter<Student>();

    public studentHasBeenDeleted: EventEmitter<Student> = new EventEmitter<Student>();


    public url: string = "https://jsonplaceholder.typicode.com/users";

    private studentListApi: any;

    constructor(private _httpClient: HttpClient/* , public ticketService: TicketService */) {
    }

    getData(): Observable<any> {
        let urlBackEnd = "http://localhost:3000/api/students";
        return this._httpClient.get<any>(urlBackEnd);
    }

    async httpGetStudents(): Promise<void> {
        let urlBackEnd = "http://localhost:3000/api/students";
        try {
            await this._httpClient.get(urlBackEnd)
            .subscribe(data => {
                this.studentListApi= (<any>data);
                this.studentListApi.forEach((element: any) => {
                    let newStudent: Student = {'id' :element['studentId'], 'firstName': element['firstName'], 'lastName': element['lastName']};
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

    httpPostStudent(data: any){
        let urlBackEndAddStudent = "http://localhost:3000/api/students/ajouter";
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        try {
            this._httpClient.post<any>(urlBackEndAddStudent, {firstName: data.firstName, lastName: data.lastName, studentId: data.id})
            .subscribe(res => {
                let newStudent: Student = {'id' :data.id, 'firstName': data.firstName, 'lastName': data.lastName};
                console.log("NEW STUDENT : ", newStudent)
                this.studentList.push(newStudent);
                this.students$.next(this.studentList);
                this.studentHasBeenAdded.emit(newStudent);
            }
            );
        } catch (error) {
            console.error("Erreur HTTP POST");
            throw error;
        }
    }

    httpDeleteStudent(id: any){
        console.log("httpDeleteStudent : ", id);
        // this.ticketService.httpDeleteTicket(id);
        let urlBackEndAddStudent = "http://localhost:3000/api/students/supprimer/" + id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        try {
            this._httpClient.delete<any>(urlBackEndAddStudent)
            .subscribe(res => {
                this.studentHasBeenDeleted.emit();
            }
            );
        } catch (error) {
            console.error("Erreur HTTP POST");
            throw error;
        }
    }
    
    // handleError(arg0: string, data: any): (err: any, caught: Observable<any>) => import("rxjs").ObservableInput<any> {
    //     throw new Error('Method not implemented.');
    // }

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
