import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../../../shared/feedback-dialog/feedback-dialog.component';
import moment from 'moment';
import { ClientesPrivService } from '../../../core/services/clientes-priv.service';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

function diaUtilValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const data: Date | null = control.value;
    if (!data) return { required: true };

    let d: Date;
    if (typeof (data as any).toDate === 'function') {
      d = (data as any).toDate(); // Moment -> Date
    } else {
      d = data;
    }

    const diaSemana = d.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      return { diaInvalido: true };
    }
    return null;
  };
}

function horaValidaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor: string = control.value;
    if (!valor) return { required: true };

    const partes = valor.split(':');
    if (partes.length !== 2) return { formatoInvalido: true };

    const hora = Number(partes[0]);
    const min = Number(partes[1]);

    if (
      isNaN(hora) ||
      isNaN(min) ||
      hora < 10 ||
      hora > 16 ||
      (hora === 16 && min > 0)
    ) {
      return { horaInvalida: true };
    }

    return null;
  };
}

declare const bootstrap: any;

@Component({
  selector: 'app-testdrive-pub',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxMaskDirective,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDialogModule
  ],
  providers: [
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './testdrive-pub.component.html',
  styleUrls: ['./testdrive-pub.component.css'],
})

export class TestdrivePubComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private clientesPrivService: ClientesPrivService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      data: [null, [Validators.required, diaUtilValidator()]],
      hora: ['', [Validators.required, horaValidaValidator()]],
      aceite: [false, [Validators.requiredTrue]],
    });
  }

  abrirDialog(titulo: string, mensagem: string) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      data: { title: titulo, message: mensagem }
    });
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }

  async onSubmit() {
    if (this.form.valid) {
      const formValue = { ...this.form.value };
      formValue.data = moment(formValue.data).format('DD/MM/YYYY');

      try {
        await this.clientesPrivService.adicionarCliente(formValue);
        this.abrirDialog('Sucesso', 'Agendamento realizado com sucesso!');

      } catch (err) {
        this.abrirDialog('Erro', 'Erro ao enviar agendamento.');
        console.error(err);
      }
    }
  }
}
