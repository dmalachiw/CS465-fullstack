
import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Travlr Getaways Admin');

  constructor(private router: Router) {}

  // Check whether a user has a login token
  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('travlr_token');
  }

  // Log out and return to the login page
  logout(): void {
    sessionStorage.removeItem('travlr_token');
    this.router.navigate(['/login']);
  }
}
