import { TestBed } from '@angular/core/testing';

import { CitiesService } from './cities.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {DatePipe} from "@angular/common";

describe('CitiesService', () => {
  let service: CitiesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitiesService, DatePipe]
    });
    service = TestBed.inject(CitiesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Similar tests to EventService
});
