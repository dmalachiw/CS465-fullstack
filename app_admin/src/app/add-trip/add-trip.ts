import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
  private formBuilder = inject(FormBuilder);
  private tripData = inject(TripData);
  private router = inject(Router);

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

  onSubmit(): void {
    if (this.tripForm.invalid || this.saving) {
      this.tripForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';

    this.tripData.addTrip(this.tripForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Unable to add trip:', error);
        this.errorMessage = 'Unable to save the trip. Please try again.';
        this.saving = false;
      }
    });
  }
}