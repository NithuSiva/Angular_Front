import { Component } from '@angular/core';
import { StudentService } from '../../../services/student/student.service';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  public studentList: Student[] = [];
  public STUDENTS_LIST: Array<any> = [];


  constructor(public studentService: StudentService) {
    // this.studentService.students$.subscribe((student) => this.studentList = student);
    this.studentService.studentHasBeenAdded.subscribe((newStudent) => {
      console.log("Emetteur a jours !", newStudent);
      window.location.reload();
    })
    this.studentService.studentHasBeenDeleted.subscribe((newStudent) => {
      console.log("Emetteur a jours !", newStudent);
      window.location.reload();
    })
  }

  ngOnInit() {
    this.httpGetStudents();
    this.studentService.students$.subscribe((elem) => {
      elem.forEach(student => {
        this.STUDENTS_LIST.push(student);
      });
    })
  }
  
  async httpGetStudents() {
    try {
      await this.studentService.httpGetStudents();
    } catch (error) {
      console.error("Erreur httpGetStudents");
    }
  }

  httpDeleteStudent(user: Student) {
    try {
      console.log("USER LIST user: ", user)
      this.studentService.httpDeleteStudent(user.id);
    } catch (error) {
      console.error("Erreur httpDeleteStudent");
    }
  }

  ticketHasBeenSelected(hasBeenSelected: boolean) {
    console.log('event received from child:', hasBeenSelected);
  }

}
