import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from 'src/services/student/student.service';
import { Student } from 'src/models/student';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent {


  public studentForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public studentService: StudentService) {
    this.studentForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: ['']
    }); 
    console.log('Composant user-form créé');

  }

  // addStudent() {
  //   let id = this.studentService.getLastId() + 1; 
  //   const studentToCreate: Student = this.studentForm.getRawValue() as Student;
  //   studentToCreate['id'] = id;

  //   let tr = document.getElementsByClassName("tr");
  //   let trArray = Array.from(tr);
  //   if(trArray)
  //     trArray.forEach(function(element) {
  //       element.remove();
  //     });

  //   this.studentService.addStudent(studentToCreate);
   
  //   console.log("studentHasBeenAdded emit : ", studentToCreate);
    
  //   console.log(this.studentService.students$)

  // }

  httpPostStudent() {
    
    const studentToCreate: Student = this.studentForm.getRawValue() as Student;
    this.studentService.httpPostStudent(studentToCreate);
    
  }
}
