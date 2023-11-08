import { Component, OnInit } from '@angular/core';
import { Major } from './enum';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export interface Ticket {
  title?: string;
  description?: string;
  date?: Date;
  student?: string;
  major?: Major;
}
