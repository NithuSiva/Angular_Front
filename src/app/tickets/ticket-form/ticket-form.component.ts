import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TicketService } from '../../../services/ticket/ticket.service';
import { StudentService } from '../../../services/student/student.service';

import { Ticket } from '../../../models/ticket';
import { Major } from 'src/models/enum';
import { Student } from 'src/models/student';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  public ticketForm: FormGroup;
  public FILIERE_LIST: string[] = Object.values(Major);
  public STUDENTS_LIST: Array<any> = [];
  constructor(public formBuilder: FormBuilder, public ticketService: TicketService, public studentService: StudentService) {
    // Form creation
   
    
    this.ticketForm = this.formBuilder.group({
      title: [''],
      description: [''],
      major: [''],
      studentID: ['']
    }); 

    this.studentService.studentHasBeenAdded.subscribe((student) => {
      console.log("Emit recu : ", student);
    })
    console.log('Composant ticket-form créé');
  }

  ngOnInit() {    
    this.httpGetCall(this.studentService);

    this.studentService.getStudentsSubject().subscribe(elem => {
      elem.forEach(student => {
        this.STUDENTS_LIST.push(student);
      });
    })
    this.studentService.studentHasBeenAdded.subscribe((student) => {
      console.log("Emit recu : ", student);
    })
  }

  async httpGetCall(studentService: StudentService) {
    try {
      await studentService.getApiAndClearStudent();
    } catch (error) {
      console.error("Erreur");
    }
  }

  addTicket() {
   /*  const ticketToCreate: Ticket = this.ticketForm.getRawValue() as Ticket;
    ticketToCreate.date = new Date();
    const studentID = this.ticketForm.get("studentID")!.value;
    ticketToCreate.student = this.STUDENTS_LIST.find(student => student.id == studentID);
    this.ticketService.addTicket(ticketToCreate); */
    console.log(this.studentService.students$)
  }

}
