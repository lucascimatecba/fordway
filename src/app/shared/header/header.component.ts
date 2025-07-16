import { AuthPrivService } from '../../core/services/auth-priv.service'
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    MatIconModule
  ]
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthPrivService
  ) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}

