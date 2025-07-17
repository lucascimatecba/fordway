import { Component } from '@angular/core';
import { AuthPrivService } from '../../../core/services/auth-priv.service';
import { LoginPrivService } from '../../../core/services/login-priv.service';
import { ReactiveFormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login-priv',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login-priv.component.html',
  styleUrl: './login-priv.component.css'
})
export class LoginPrivComponent {
  loginForm: FormGroup;
  hidePassword = true;
  mensagemErro: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginPrivService,
    private router: Router,
    private authService: AuthPrivService
  ) {
    this.loginForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {nome, senha} = this.loginForm.value;

      this.loginService.login(nome, senha).subscribe({
        next: (usuario) => {
          this.authService.setUsuario(usuario);
          this.router.navigate(['/home-priv']);
        },
        error: (err) => {
          this.mensagemErro = err.error?.message || 'Erro ao fazer login';
        }
      })
    }
  }
}

