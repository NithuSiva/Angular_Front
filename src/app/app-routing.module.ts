import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component'
import { UserListComponent } from './users/user-list/user-list.component'

const routes: Routes = [
  { path: 'users', component: UserListComponent},
  { path: 'tickets', component: TicketListComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
