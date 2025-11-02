import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  private apiUrl = `${environment.apiBaseUrl}/periods/log`;

  constructor(private http: HttpClient){}

  logPeriod(periodData: {startDate: string; cycleLength: number}): Observable<any> {
    return this.http.post(this.apiUrl, periodData);
  }
}
