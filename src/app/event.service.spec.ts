import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';
import { DatePipe } from '@angular/common';

describe('EventService', () => {
  let service: EventService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService, DatePipe]
    });
    service = TestBed.inject(EventService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to get events', () => {
    const page = '1';
    const countryCode = 'US';
    const city = 'New York';

    service.getEvents(page, countryCode, city).subscribe();

    const req = httpTestingController.expectOne((request) => {
      return (
        request.url === 'https://app.ticketmaster.com/discovery/v2/events' &&
        request.params.get('apikey') === service['apiKey'] &&
        request.params.get('locale') === '*' &&
        request.params.get('page') === page &&
        request.params.get('countryCode') === countryCode &&
        request.params.get('city') === city
      );
    });

    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('should retrieve events', () => {
    const mockEventsResponse = {
      _embedded: {
        events: [
          { id: '1', name: 'Event 1' },
          { id: '2', name: 'Event 2' }
        ]
      },
      page: { totalElements: 2, totalPages: 1 }
    };

    service.getEvents('1').subscribe(events => {
      expect(events).toEqual(mockEventsResponse);
    });

    const req = httpTestingController.expectOne(req => {
      return req.url === 'https://app.ticketmaster.com/discovery/v2/events' &&
        req.params.get('page') === '1';
    });

    expect(req.request.method).toEqual('GET');

    req.flush(mockEventsResponse);
  });

});
