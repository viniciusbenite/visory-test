import {Component, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {CitiesService} from "../cities.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {

  countryCodes = [
    { name: 'Brazil', code: 'BR' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Australia', code: 'AU' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'United States', code: 'US' },
  ]

  form: FormGroup = new FormGroup({
    countryCode: new FormControl(''),
    city: new FormControl({ value: '', disabled: true }),
    startDateTime: new FormControl(''),
    endDateTime: new FormControl(''),
  });

  displayedColumns: string[] = ['id', 'name', 'type', 'startDate', 'startTime', 'url'];

  cities: string[] = [];
  filteredCities: Observable<string[]> | undefined;

  events: Event[] = [];
  totalEvents: number = 0;
  totalPages: number = 0;
  pageNumber: number = 1;

  constructor(private eventService: EventService, private citiesService: CitiesService, private router: Router) {

  }

  ngOnInit(): void {
    this.getEvents(); // Get default events

    this.filteredCities = this.form.get('city')?.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCities(value || '')),
    );
  }

  getEvents() {
    const formValue = this.form.value;
    const currentPage = this.pageNumber.toString();

    this.eventService.getEvents(currentPage, formValue?.countryCode, formValue?.city, formValue?.startDateTime, formValue?.endDateTime)
      .pipe(
        map(response => {
          this.totalEvents = response.page.totalElements;
          this.totalPages = response.page.totalPages;

          return response._embedded.events.map((event: any) => ({
            id: event.id,
            name: event.name,
            type: event.type,
            startDate: event.dates.start.localDate,
            startTime: event.dates.start.localTime,
            url: event.url
          }));
        }),
        catchError((error) => {
          console.log('No events found.', error);
          return of([]);
        })
      )
      .subscribe((events: Event[]) => {
        this.events = events;
        console.log(this.events);
      });
  }

  getEventDetails(eventId: string) {
    this.router.navigate(['/details', eventId]);
  }

  getCities(countryCode: string) {
    const selectedCountry = this.countryCodes.find(country => country.code === countryCode);

    if (selectedCountry) {
      const selectedCountryName: string = selectedCountry.name.toLowerCase();

      this.citiesService.getCities(selectedCountryName)
        .pipe(
          catchError(() => {
            console.log('No cities found.');
            return of([]);
          })
        )
        .subscribe((response: any) => {
          this.cities = response.data;
          this.form.get('city')?.enable();
        });
    }
  }

  onPageChange(event: any): void {
    if (event.pageIndex > this.totalPages) {
      // handle the last page better
      return;
    }

    this.pageNumber = event.pageIndex + 1;
    this.getEvents();
  }

  private filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }
}
