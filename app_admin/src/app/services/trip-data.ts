
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/trips';

  // Get authentication headers for protected requests
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('travlr_token');

    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }

  // Retrieve all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  // Retrieve a single trip
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.apiUrl}/${encodeURIComponent(tripCode)}`
    );
  }

  // Add a trip (authentication required)
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(
      this.apiUrl,
      trip,
      { headers: this.getAuthHeaders() }
    );
  }

  // Update a trip (authentication required)
  updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiUrl}/${encodeURIComponent(tripCode)}`,
      trip,
      { headers: this.getAuthHeaders() }
    );
  }

  // Delete a trip (authentication required)
  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${encodeURIComponent(tripCode)}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
