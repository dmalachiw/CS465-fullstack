import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-listing',
  imports: [TripCard, RouterLink],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  private tripData = inject(TripData);

  ngOnInit(): void {
    this.tripData.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
      },
      error: (error) => {
        console.error('Unable to load trips:', error);
      }
    });
  }

  onTripDeleted(tripCode: string): void {
    this.trips = this.trips.filter(
      trip => trip.code !== tripCode
    );
  }
}