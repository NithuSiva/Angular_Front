import { Component, OnInit } from '@angular/core';
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
    this.studentService.students$.subscribe((student) => this.studentList = student);
  }

  ngOnInit() {
    this.httpGetCall(this.studentService);

    this.studentService.students$.subscribe((elem) => {
      elem.forEach(student => {
        this.STUDENTS_LIST.push(student);
      });
    })
  }

  async httpGetCall(studentService: StudentService) {
    try {
      await studentService.getApiAndClearStudent();
    } catch (error) {
      console.error("Erreur");
    }
  }

  ticketHasBeenSelected(hasBeenSelected: boolean) {
    console.log('event received from child:', hasBeenSelected);
  }


}
