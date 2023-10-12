import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sponsor} from "../interfaces/sponsor";
import {Response} from "../interfaces/response";

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  private apiBaseUrl = 'https://dev.nobala.edu.sa/api/';

  constructor(private http: HttpClient) {
  }

  getSponsors(): Observable<Response> {
    return this.http.get<Response>(`${this.apiBaseUrl}sponsors`);
  }

  addSponsor(sponsor: Sponsor): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}sponsors`, sponsor);
  }
}
