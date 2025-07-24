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
    MatDialogModule
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

    if (this.form.invalid) {
        console.warn('Formulário inválido:', this.form.errors);
        return;
    }

    if (this.senhasNaoCoincidem()) {
        console.warn('Senhas não coincidem');
        return;
    }

    try {
        const dados = {
            nome: this.form.value.nome,
            codigoChave: this.form.value.codigoChave,
            email: this.form.value.email,
            senha: this.form.value.senha
        };

        await this.colaboradorService.cadastrarColaborador(dados);
        this.mostrarFeedbackSucesso();
    } catch (error) {
        this.tratarErros(error);
    }
  }

  private mostrarFeedbackSucesso() {
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
  }

  private tratarErros(error: any) {
    console.error('Erro detalhado:', error);

    const errorMessage = error?.message || error?.toString() || 'Erro desconhecido';

    this.form.controls['codigoChave'].setErrors(null);
    this.form.controls['nome'].setErrors(null);
    this.form.controls['email'].setErrors(null);

    if (typeof error === 'string' || error instanceof Error) {
        if (errorMessage.includes('Código-chave inválido')) {
            this.form.controls['codigoChave'].setErrors({ codigoInvalido: true });
        } else if (errorMessage.includes('Nome já em uso')) {
            this.form.controls['nome'].setErrors({ nomeDuplicado: true });
        } else if (errorMessage.includes('Email já em uso')) {
            this.form.controls['email'].setErrors({ emailDuplicado: true });
        } else {
            this.mostrarErroGenerico(errorMessage);
        }
    } else {
        this.mostrarErroGenerico(errorMessage);
    }
  }

  private mostrarErroGenerico(mensagem: string) {
    this.dialog.open(FeedbackDialogComponent, {
        data: {
            title: 'Erro no cadastro',
            message: mensagem,
            action: 'Fechar'
        }
    });
  }


  senhasNaoCoincidem(): boolean {
    return this.form.value.senha !== this.form.value.confirmarSenha;
  }
}
