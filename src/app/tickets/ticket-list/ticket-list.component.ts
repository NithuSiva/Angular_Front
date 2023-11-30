import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Ticket } from '../../../models/ticket';
import { Event } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  public ticketList: Ticket[] = [];
  public displayTicketArchived: boolean = false;

  constructor(public ticketService: TicketService) {
    this.ticketService.tickets$.subscribe((tickets) => {
      this.ticketList = tickets;
    });
    this.ticketService.ticketHasBeenAdded.subscribe((newStudent) => {
      console.log("Emetteur a jours !", newStudent);
      window.location.reload();
    })
    this.ticketService.ticketHasBeenDeleted.subscribe((newStudent) => {
      console.log("Emetteur a jours !", newStudent);
      window.location.reload();
    })
  }

  ngOnInit() {
    this.httpGetTickets();
  }

  async httpGetTickets() {
    try {
      await this.ticketService.httpGetTickets();
    } catch (error) {
      console.error("Erreur httpGetStudents");
    }
  }

  ticketHasBeenSelected(hasBeenSelected: boolean) {
    console.log('event received from child:', hasBeenSelected);
  }

  archivedTicket(ticket: Ticket, event: any) {
    // console.log(ticket);
    this.ticketService.archivedTicket(ticket);
    // let element = event.srcElement;
    // let el = document.getElementById(element.id)?.parentElement;
    // el?.classList.add('ticket-archived');
  }

  deletedTicket(ticket: Ticket) {
    // this.ticketService.deletedTicket(ticket);
    console.log("Ticket list component deleted")
  } 

  
}
