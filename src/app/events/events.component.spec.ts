import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsComponent } from './events.component';
import { EventService } from '../event.service';
import { CitiesService } from '../cities.service';
import { Router } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { of } from 'rxjs';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSelect} from "@angular/material/select";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatToolbar} from "@angular/material/toolbar";
import {MatPaginator} from "@angular/material/paginator";

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let mockEventService: jasmine.SpyObj<EventService>;
  let mockCitiesService: jasmine.SpyObj<CitiesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  let mockEvents: any[];

  beforeEach(async () => {
    mockEventService = jasmine.createSpyObj('EventService', ['getEvents']);
    mockCitiesService = jasmine.createSpyObj('CitiesService', ['getCities']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [EventsComponent],
      imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatSelect,
        MatOption,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatToolbar,
        MatPaginator,],
      providers: [
        { provide: EventService, useValue: mockEventService },
        { provide: CitiesService, useValue: mockCitiesService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;

    mockEvents = [
      {
        id: '1',
        name: 'Event 1',
        type: 'Type 1',
        dates: {
          start: {
            localDate: '',
            localTime: ''
          }
        },
        url: ''
      },
      {
        id: '2',
        name: 'Event 2',
        type: 'Type 2',
        dates: {
          start: {
            localDate: '',
            localTime: ''
          }
        },
        url: ''
      }
    ];

    mockEventService.getEvents.and.returnValue(of({ _embedded: { events: mockEvents }, page: { totalElements: 2, totalPages: 1 } }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve events', () => {
    const expected = [
      { id: '1', name: 'Event 1', type: 'Type 1', startDate: '', startTime: '', url: '' },
      { id: '2', name: 'Event 2', type: 'Type 2', startDate: '', startTime: '', url: '' },
    ];

    component.getEvents();

    expect(mockEventService.getEvents).toHaveBeenCalled();
    expect(component.events).toEqual(jasmine.arrayContaining(expected));
    expect(component.totalEvents).toEqual(2);
    expect(component.totalPages).toEqual(1);
  });


  it('should navigate to event details', () => {
    const eventId = '1';
    component.getEventDetails(eventId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details', eventId]);
  });

  it('should not update pageNumber or call getEvents when pageIndex > totalPages', () => {
    component.totalPages = 5;
    const event = { pageIndex: 6 };

    spyOn(component, 'getEvents');

    component.onPageChange(event);

    expect(component.pageNumber).toEqual(1);
    expect(component.getEvents).not.toHaveBeenCalled();
  });

  it('should retrieve cities for selected country', () => {
    const countryCode = 'BR';
    const countryName = 'Brazil';
    mockCitiesService.getCities.and.returnValue(of({ data: ['City 1', 'City 2'] }));

    component.getCities(countryCode);

    expect(mockCitiesService.getCities).toHaveBeenCalledWith(countryName.toLowerCase());
    expect(component.cities).toEqual(['City 1', 'City 2']);
    expect(component.form.get('city')?.enabled).toBeTruthy();
  });

});
