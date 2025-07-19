import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ColaboradorService } from '../../../core/services/colaborador.service';

@Component({
  selector: 'app-sign-priv',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sign-priv.component.html',
  styleUrls: ['./sign-priv.component.css']
})
export class SignPrivComponent {
  hideSenha = true;
  hideConfirmar = true;
  submitted = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private colaboradorService: ColaboradorService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      codigoChave: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    });
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid || this.senhasNaoCoincidem()) return;

    const { nome, codigoChave, email, senha } = this.form.value;

    this.colaboradorService.verificarEmail(email).subscribe((emailExiste) => {
      if (emailExiste) {
        this.form.controls['email'].setErrors({ emailDuplicado: true });
        return;
      }

      this.colaboradorService.verificarNome(nome).subscribe((nomeExiste) => {
        if (nomeExiste) {
          this.form.controls['nome'].setErrors({ nomeDuplicado: true });
          return;
        }

        this.colaboradorService.cadastrarColaborador({ nome, codigoChave, email, senha }).subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            if (err.status === 401) {
              this.form.controls['codigoChave'].setErrors({ codigoInvalido: true });
            } else {
              console.error('Erro inesperado:', err);
            }
          }
        });
      });
    });
  }


  senhasNaoCoincidem(): boolean {
    return this.form.value.senha !== this.form.value.confirmarSenha;
  }
}
