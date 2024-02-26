import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from "./events/events.component";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: '**', redirectTo: '/events'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
