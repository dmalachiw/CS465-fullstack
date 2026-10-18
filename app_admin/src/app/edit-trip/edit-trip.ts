import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  private formBuilder = inject(FormBuilder);
  private tripData = inject(TripData);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private tripCode = '';
  loading = true;
  saving = false;
  errorMessage = '';

  tripForm = this.formBuilder.nonNullable.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', [
      Validators.required,
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]],
    image: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') ?? '';

    if (!this.tripCode) {
      this.errorMessage = 'No trip code was provided.';
      this.loading = false;
      return;
    }

    this.tripData.getTrip(this.tripCode).subscribe({
      next: (trips) => {
        const trip = trips[0];

        if (!trip) {
          this.errorMessage = 'Trip not found.';
          this.loading = false;
          return;
        }

        this.tripForm.patchValue({
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: trip.start.slice(0, 10),
          resort: trip.resort,
          perPerson: String(trip.perPerson),
          image: trip.image,
          description: trip.description
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Unable to load trip:', error);
        this.errorMessage = 'Unable to load this trip.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.tripForm.invalid || this.saving || this.loading) {
      this.tripForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';

    this.tripData.updateTrip(
      this.tripCode,
      this.tripForm.getRawValue()
    ).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Unable to update trip:', error);
        this.errorMessage = 'Unable to update the trip. Please try again.';
        this.saving = false;
      }
    });
  }
}