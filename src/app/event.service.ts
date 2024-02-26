import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiKey = 'uAlUb7m2rka7ccclRYEPjqn9urISOQLI'; // This should be store safely (env vars...)
  private apiUrl = 'https://app.ticketmaster.com/discovery/v2/events';

  private TIME_FORMAT: string = 'yyyy-MM-ddTHH:mm:ss';
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) { }

  public getEvents(page: string,
                   countryCode?: string,
                   city?: string,
                   startDateTime?: string,
                   endDateTime?: string,) : Observable<any> {
    const params: {
      apikey: string,
      locale: string,
      page: string,
      countryCode?: string,
      city?: string,
      startDateTime?: string,
      endDateTime?: string,
    } = {
      apikey: this.apiKey,
      locale: '*',
      page: page
    }

    if (countryCode) {
      params.countryCode = countryCode;
    }
    if (city) {
      params.city = city;
    }
    if (startDateTime) {
      params.startDateTime = this.datePipe.transform(startDateTime, this.TIME_FORMAT) + 'Z';
    }
    if (endDateTime) {
      params.endDateTime = this.datePipe.transform(endDateTime, this.TIME_FORMAT)+ 'Z';
    }

    return this.httpClient.get<any>(this.apiUrl, { params: params });
  }

  public getEventDetails(eventId: string | null) {
    const params = {
      apikey: this.apiKey,
      locale: '*'
    };

    const url = this.apiUrl + '/' + eventId;

    return this.httpClient.get<any>(url, { params: params });
  }
}
