import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/models/student';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() student!: Student;
  @Output() studentHasBeenDeleted: EventEmitter<Student> = new EventEmitter<Student>();

  ngOnInit(): void {
    
  }
  studentDelete() {
    this.studentHasBeenDeleted.emit(this.student);
  }

}
