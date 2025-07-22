import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../../../shared/feedback-dialog/feedback-dialog.component';

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
    MatDialogModule,
    FeedbackDialogComponent
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
    private colaboradorService: ColaboradorService,
    private dialog: MatDialog
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

  async onSubmit() {
    this.submitted = true;

    if (this.form.invalid || this.senhasNaoCoincidem()) return;

    const { nome, codigoChave, email, senha } = this.form.value;

    try {
      const [emailExiste, nomeExiste] = await Promise.all([
        this.colaboradorService.verificarEmail(email),
        this.colaboradorService.verificarNome(nome)
      ]);

      if (emailExiste) {
        this.form.controls['email'].setErrors({ emailDuplicado: true });
        return;
      }

      if (nomeExiste) {
        this.form.controls['nome'].setErrors({ nomeDuplicado: true });
        return;
      }

      await this.colaboradorService.cadastrarColaborador({ nome, codigoChave, email, senha });

      const dialogRef = this.dialog.open(FeedbackDialogComponent, {
        data: {
          title: 'Cadastro realizado!',
          message: 'Seu cadastro foi concluído com sucesso.',
          action: 'Ir para login'
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/login']);
      });

    } catch (error: any) {
      if (error.code === 'permission-denied') {
        this.form.controls['codigoChave'].setErrors({ codigoInvalido: true });
      } else {
        console.error('Erro no cadastro:', error);
        this.dialog.open(FeedbackDialogComponent, {
          data: {
            title: 'Erro no cadastro',
            message: 'Não foi possível concluir o cadastro. Tente novamente mais tarde.',
            action: 'Fechar'
          }
        });
      }
    }
  }


  senhasNaoCoincidem(): boolean {
    return this.form.value.senha !== this.form.value.confirmarSenha;
  }
}
