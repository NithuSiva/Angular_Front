import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TICKETS_MOCKED } from '../../mocks/tickets.mock';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private ticketList: Ticket[] = TICKETS_MOCKED;

  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public tickets$: BehaviorSubject<Ticket[]> = new BehaviorSubject(this.ticketList);

  constructor() {
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

   deletedTicket(ticket: Ticket) {
    // this.tickets$.value.filter(tick => tick != ticket);
    this.tickets$.value.splice(this.tickets$.value.indexOf(ticket), 1);
    console.log("Suppresion dans la liste: ", this.tickets$.value);
    this.tickets$.next(this.ticketList)
  } 
}
