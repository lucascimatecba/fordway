import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FeedbackConfirmationComponent } from '../../../shared/feedback-confirmation/feedback-confirmation.component';
import { ClientesPrivService } from '../../../core/services/clientes-priv.service';
import { Cliente } from '../../../shared/models/cliente.model';

@Component({
  selector: 'app-clientes-priv',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './clientes-priv.component.html',
  styleUrls: ['./clientes-priv.component.css']
})
export class ClientesPrivComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private dialog: MatDialog,
    private clientesService: ClientesPrivService
  ) {}

  async ngOnInit() {
    try {
      this.clientes = await this.clientesService.obterClientes();
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    }
  }

  async marcarComoFinalizado(cliente: Cliente) {
    const confirmado = await this.confirmarAcao(`Finalizar test-drive de ${cliente.nome}?`);
    if (!confirmado) return;
    cliente.status = 'finalizado';
    try {
      await this.clientesService.atualizarStatusCliente(cliente.id!, 'finalizado');
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  }

  async excluirCliente(cliente: Cliente) {
    const confirmado = await this.confirmarAcao(`Excluir ${cliente.nome}?`);
    if (!confirmado) return;
    try {
      await this.clientesService.excluirCliente(cliente.id!);
      this.clientes = this.clientes.filter(c => c.id !== cliente.id);
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
    }
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

  remarcar(cliente: Cliente) {
    cliente.editandoAgendamento = true;
  }
}
