import { Component } from '@angular/core';
import { AuthPrivService } from '../../../core/services/auth-priv.service';
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
    private router: Router,
    private authService: AuthPrivService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }

  async onSubmit() {
    this.mensagemErro = '';

    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;

      try {
        await this.authService.login(email, senha);
        this.router.navigate(['/home-priv']);
      } catch (error: any) {
        this.mensagemErro = error.message;
        console.error('Erro no login:', error);
      }
    }
  }
}