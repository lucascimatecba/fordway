import { Component, OnInit } from '@angular/core';
import { AuthPrivService } from '../../../core/services/auth-priv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-priv',
  templateUrl: './home-priv.component.html',
  styleUrls: ['./home-priv.component.css']
})
export class HomePrivComponent implements OnInit {
  nomeUsuario: string = '';

  constructor(
    private authPrivService: AuthPrivService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.authPrivService.getUsuario();
    this.nomeUsuario = usuario?.nome ?? 'usuário';
  }

  irParaDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  irParaClientes(): void {
    this.router.navigate(['/clientes']);
  }
}
