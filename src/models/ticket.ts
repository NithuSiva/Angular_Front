import { Component, OnInit } from '@angular/core';
import { Major } from './enum';
import { Student } from './student';
/* @Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
}) */
export interface Ticket {
  title?: string;
  description?: string;
  date?: Date;
  student?: Student;
  major?: Major;
  archived?: boolean;
}
