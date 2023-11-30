import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ticket } from '../../../models/ticket';
import { Major } from '../../../models/enum';
import { TicketService } from 'src/services/ticket/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  /**
   * Inputs & Output allow communication between parent & child components.
   * More information: https://angular.io/guide/component-interaction
   */
  @Input()
  ticket!: Ticket;
  
  @Output()
  ticketHasBeenSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  ticketHasBeenArchived: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  @Output()
  ticketHasBeenDeleted: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  constructor(public ticketService: TicketService) {
  }

  ngOnInit() {
  }
  
  public get major(): typeof Major {
    return Major;
  }

  selectTicket() {
    this.ticketHasBeenSelected.emit(true);
  }

  deletedTicket(ticket: Ticket) {
    this.ticketHasBeenDeleted.emit(ticket);
    console.log("suppresion")
  }

  archivedTicket(ticket: Ticket, event: any) {
    this.ticketHasBeenArchived.emit(ticket);
    console.log("Ticket component deleted")
    // let element = event.srcElement;
    // let el = document.getElementById(element.id)?.parentElement;
    // el?.classList.add('ticket-archived');
  }

  httpDeleteTicket(ticket: any) {
    try {
      this.ticketService.httpDeleteTicket(ticket.student.studentId);
    } catch (error) {
      console.error("Erreur httpDeleteStudent");
    }
  }
}
