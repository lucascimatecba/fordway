import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-pub',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-pub.component.html',
  styleUrl: './home-pub.component.css'
})
export class HomePubComponent {
  destaques = [
    { nome: 'Ranger', img: 'assets/ranger_2.jpg' },
    { nome: 'Mustang', img: 'assets/mustang_2.jpg' },
    { nome: 'Territory', img: 'assets/territory_2.jpg' },
    { nome: 'Bronco Sport', img: 'assets/broncoSport_2.jpg' }
  ];
}
