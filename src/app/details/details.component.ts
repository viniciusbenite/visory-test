import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../event.service";
import {catchError, of} from "rxjs";
import {TicketMasterEvent} from "../TicketMasterEvent";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'startDate', 'startTime', 'url', 'info'];

  eventId: string | null = '';
  event: TicketMasterEvent | undefined;

  constructor(private route: ActivatedRoute, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getEventDetails();
  }

  getEventDetails() {
    this.eventId = this.route.snapshot.paramMap.get('id');

    this.eventService.getEventDetails(this.eventId).pipe(
      catchError((error) => {
        console.error('An error occurred while fetching event details:', error);
        return of([]);
      })
    )
      .subscribe((event: any) => {
        this.event = {
          id: event.id,
          name: event.name,
          type: event.type,
          startDate: event.dates.start.localDate,
          startTime: event.dates.start.localTime,
          url: event.url,
          info: event.info,
        };
        console.log(this.event);
      });
  }
}
