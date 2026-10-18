import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-card',
  imports: [RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input({ required: true }) trip!: Trip;
  @Output() deleted = new EventEmitter<string>();

  private tripData = inject(TripData);

  deleting = false;
  errorMessage = '';

  deleteTrip(): void {
    if (this.deleting) {
      return;
    }

    if (!window.confirm(`Delete ${this.trip.name}?`)) {
      return;
    }

    this.deleting = true;
    this.errorMessage = '';

    this.tripData.deleteTrip(this.trip.code).subscribe({
      next: () => {
        this.deleted.emit(this.trip.code);
      },
      error: (error) => {
        console.error('Unable to delete trip:', error);
        this.errorMessage = 'Unable to delete this trip. Please try again.';
        this.deleting = false;
      }
    });
  }
}