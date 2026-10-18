import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/trips';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.apiUrl}/${encodeURIComponent(tripCode)}`
    );
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiUrl}/${encodeURIComponent(tripCode)}`,
      trip
    );
  }

  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${encodeURIComponent(tripCode)}`
    );
  }
}