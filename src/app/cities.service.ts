import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiEndpoint: string = 'https://countriesnow.space/api/v0.1/countries/cities';

  constructor(private httpClient: HttpClient) { }

  getCities(country: string) {
    const body = { 'country': country};

    return this.httpClient.post<any>(this.apiEndpoint, body);
  }
}
