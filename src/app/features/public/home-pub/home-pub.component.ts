import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-pub',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-pub.component.html',
  styleUrl: './home-pub.component.css'
})
export class HomePubComponent {
  constructor(private router: Router) { }

  destaques = [
    { id: 1, nome: 'Ranger', img: 'assets/ranger_2.jpg', url: 'https://www.ford.com.br/picapes/ranger/' },
    { id: 2, nome: 'Mustang', img: 'assets/mustang_2.jpg', url: 'https://www.ford.com.br/performance/mustang/' },
    { id: 3, nome: 'Territory', img: 'assets/territory_2.jpg', url: 'https://www.ford.com.br/suvs-e-crossovers/territory/' },
    { id: 4, nome: 'Bronco Sport', img: 'assets/broncoSport_2.jpg', url: 'https://www.ford.com.br/suvs-e-crossovers/bronco-sport/' }
  ];

  irParaDetalhe(id: number) {
  this.router.navigate(['/veiculo', id]);
}
}
