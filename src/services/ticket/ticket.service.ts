import { EventEmitter, Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { StudentService } from '../student/student.service';
import { Student } from 'src/models/student';

import { TICKETS_MOCKED } from '../../mocks/tickets.mock';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public ticketList: Ticket[] = [];

  public tickets$: BehaviorSubject<Ticket[]> = new BehaviorSubject(this.ticketList);

  private ticketListApi: any;

  public ticketHasBeenAdded: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  public ticketHasBeenDeleted: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  constructor(private _httpClient: HttpClient, public studentService: StudentService) {
  }

  getTicketList(){
    return this.ticketList;
  }

  httpGetTickets(){
    let urlBackEnd = "http://localhost:3000/api/tickets";
    try {
        this._httpClient.get(urlBackEnd)
        .subscribe(data => {
          this.ticketListApi = (<any>data);
          this.ticketListApi.forEach((element: any) => {
            let students = this.studentService.getData().subscribe(
              (students) => {
                // students.forEach(((element2: any) => {

                //   if (element2.studentId == element['id']) {
                //     let studentCurrent: Student = {'id' :element2['studentId'], 'firstName': element2['firstName'], 'lastName': element2['lastName']};

                //     let newTicket: Ticket = {
                //     'title': element['title'],
                //     'description': element['description'],
                //     'date': element['date'],
                //     'student': studentCurrent,
                //     'major': element['major'],
                //     'archived': element['archived']
                //     };

                //     this.ticketList.push(newTicket);
                //   } 
                // }));
                let index = students.map(function(e: { studentId: any; }) { return e.studentId}).indexOf(element['id']);
                console.log(index);
                let currentStudent = -1; 

                if(index >= 0) {
                  let newTicket: Ticket = {
                    'title': element['title'],
                    'description': element['description'],
                    'date': element['date'],
                    'student': students[index],
                    'major': element['major'],
                    'archived': element['archived']
                    };

                    this.ticketList.push(newTicket);
                } else {
                  this.httpDeleteTicket(element['id'])
                }

                
              },
              (error) => {
                console.error('Erreur lors de la récupération des données :', error);
              }
            );
            
          });
          this.ticketListApi = this.ticketList;
          this.tickets$.next(this.ticketListApi);
        }
        );
    } catch (error) {
        console.error("Erreur HTTP GET");
        throw error;
    }
  }

  addTicket(ticket: Ticket) {
    // You need here to update the list of ticket and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.tickets$.value.push(ticket);
    console.log("Ajout dans la liste: ", this.tickets$.value);
    this.tickets$.next(this.ticketList)
  }

  archivedTicket(ticket: Ticket) {
    ticket.archived = true;
    this.tickets$.next(this.ticketList);
  }

  httpPostTicket(ticket: any) {
    let urlBackEndAddTicket = "http://localhost:3000/api/tickets/ajouter";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    try {
        // title?: string;
        // description?: string;
        // date?: Date;
        // student?: Student;
        // major?: Major;
        // archived?: boolean;
      let data: any = {
        title: ticket.title,
        description: ticket.description,
        date: ticket.date,
        id: ticket.student.id,
        major: ticket.major,
        archived: false
      };
      this._httpClient.post<any>(urlBackEndAddTicket, data)
      .subscribe(res => {
        this.ticketHasBeenAdded.emit(data);
      }
      );
    } catch (error) {
        console.error("Erreur HTTP POST");
        throw error;
    }
  }

  httpDeleteTicket(id: any){
    console.log("httpDeleteStudent : ", id);
    let urlBackEndDeleteTicket = "http://localhost:3000/api/tickets/supprimer/" + id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    try {
        this._httpClient.delete<any>(urlBackEndDeleteTicket)
        .subscribe(res => {
            this.ticketHasBeenDeleted.emit();
        }
        );
        return true;
    } catch (error) {
        console.error("Erreur HTTP POST");
        throw error;
    }
  }


  //  deletedTicket(ticket: Ticket) {
  //   // this.tickets$.value.filter(tick => tick != ticket);
  //   this.tickets$.value.splice(this.tickets$.value.indexOf(ticket), 1);
  //   console.log("Suppresion dans la liste: ", this.tickets$.value);
  //   this.tickets$.next(this.ticketList)
  // } 


}
