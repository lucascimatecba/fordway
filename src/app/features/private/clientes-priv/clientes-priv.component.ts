import { Component, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FeedbackConfirmationComponent } from '../../../shared/feedback-confirmation/feedback-confirmation.component';

interface Cliente {
  nome: string;
  telefone: string;
  cpf: string;
  cidade: string;
  status: 'nao_contatado' | 'marcado' | 'finalizado';
  agendamento?: string;
  editandoAgendamento?: boolean;
}

declare var bootstrap: any;

@Component({
  selector: 'app-clientes-priv',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    FeedbackConfirmationComponent
  ],
  templateUrl: './clientes-priv.component.html',
  styleUrls: ['./clientes-priv.component.css']
})
export class ClientesPrivComponent {
  clientes: Cliente[] = [];

  private dropdownsInitialized = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    fetch('http://localhost:3001/clientes')
      .then(res => res.json())
      .then(data => {
        this.clientes = data.clientes.map((cliente: Cliente) => ({
          ...cliente,
          editandoAgendamento: false,
        }));
      })
      .catch(err => {
        console.error('Erro ao buscar clientes:', err);
      });
  }

  ngAfterViewChecked() {
    if (!this.dropdownsInitialized) {
      const dropdownTriggerList = document.querySelectorAll('.dropdown-toggle');
      dropdownTriggerList.forEach(dropdownToggleEl => {
        if (!bootstrap.Dropdown.getInstance(dropdownToggleEl)) {
          new bootstrap.Dropdown(dropdownToggleEl);
        }
      });
      this.dropdownsInitialized = true;
    }
  }

  private resetDropdowns() {
    this.dropdownsInitialized = false;
  }

  async confirmarAcao(mensagem: string): Promise<boolean> {
    const dialogRef = this.dialog.open(FeedbackConfirmationComponent, {
      data: {
        title: 'Confirmação',
        message: mensagem,
        confirmText: 'Sim',
        cancelText: 'Cancelar'
      }
    });

    return await dialogRef.afterClosed().toPromise();
  }

  async marcarComoFinalizado(cliente: Cliente) {
    const confirmado = await this.confirmarAcao(`Finalizar test-drive de ${cliente.nome}?`);
    if (!confirmado) return;
    cliente.status = 'finalizado';
  }

  async excluirCliente(cliente: Cliente) {
    const confirmado = await this.confirmarAcao(`Excluir ${cliente.nome}?`);
    if (!confirmado) return;
    this.clientes = this.clientes.filter(c => c !== cliente);
    this.resetDropdowns();
  }

  remarcar(cliente: Cliente) {
    cliente.editandoAgendamento = true;
  }
}
