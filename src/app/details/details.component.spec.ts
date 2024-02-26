import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { DetailsComponent } from './details.component';
import { EventService } from '../event.service';
import {MatToolbar} from "@angular/material/toolbar";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {MatPaginator} from "@angular/material/paginator";

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockActivatedRoute: any;
  let mockEventService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: { paramMap: convertToParamMap({ id: 'test_id' }) }
    };

    mockEventService = jasmine.createSpyObj('EventService', ['getEventDetails']);
    mockEventService.getEventDetails.and.returnValue(of({
      id: 'test_id',
      name: 'Test Event',
      type: 'Test Type',
      dates: { start: { localDate: '2024-02-26', localTime: '12:00' }},
      url: 'http://example.com',
      info: 'Test info'
    }));

    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
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
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: EventService, useValue: mockEventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch event details', () => {
    expect(component.eventId).toBe('test_id');
    expect(mockEventService.getEventDetails).toHaveBeenCalledWith('test_id');

    fixture.whenStable().then(() => {
      expect(component.event).toEqual({
        id: 'test_id',
        name: 'Test Event',
        type: 'Test Type',
        startDate: '2024-02-26',
        startTime: '12:00',
        url: 'http://example.com',
        info: 'Test info'
      });
    });
  });

});
