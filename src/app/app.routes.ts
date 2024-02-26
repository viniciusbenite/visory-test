import { Routes } from '@angular/router';
import {EventsComponent} from "./events/events.component";
import {DetailsComponent} from "./details/details.component";

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full'},
  { path: 'events', component: EventsComponent },
  { path: 'details', component: DetailsComponent }
];
