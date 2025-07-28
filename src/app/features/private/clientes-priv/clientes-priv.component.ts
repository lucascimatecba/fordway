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
  clientesFiltrados: Cliente[] = [];
  filtroCidade: string = '';

  constructor(
    private dialog: MatDialog,
    private clientesService: ClientesPrivService
  ) {}

  async ngOnInit() {
    await this.carregarClientes();
  }

  async carregarClientes() {
    try {
      this.clientes = await this.clientesService.obterClientes();
      this.aplicarFiltros();
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    }
  }

  aplicarFiltros() {
    this.clientesFiltrados = this.filtroCidade
      ? this.clientes.filter(c =>
          c.cidade.toLowerCase().includes(this.filtroCidade.toLowerCase()))
      : [...this.clientes];

    this.clientesFiltrados.sort((a, b) => {
      if (a.status === 'finalizado' && b.status !== 'finalizado') return 1;
      if (a.status !== 'finalizado' && b.status === 'finalizado') return -1;

      const cidadeCompare = a.cidade.localeCompare(b.cidade);
      if (cidadeCompare !== 0) return cidadeCompare;

      return a.nome.localeCompare(b.nome);
    });
  }

  async marcarComoFinalizado(cliente: Cliente) {
    const confirmado = await this.confirmarAcao(`Finalizar test-drive de ${cliente.nome}?`);
    if (!confirmado) return;

    try {
      await this.clientesService.atualizarStatusCliente(cliente.id!, 'finalizado');
      await this.carregarClientes();
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  }

  async reabrirCliente(cliente: Cliente) {
    const confirmado = await this.confirmarAcao(`Reabrir cliente ${cliente.nome}?`);
    if (!confirmado) return;

    try {
      await this.clientesService.atualizarStatusCliente(cliente.id!, 'nao_contatado');
      await this.carregarClientes();
    } catch (err) {
      console.error('Erro ao reabrir cliente:', err);
    }
  }

  async excluirCliente(cliente: Cliente) {
    const confirmado = await this.confirmarAcao(`Excluir ${cliente.nome}?`);
    if (!confirmado) return;

    try {
      await this.clientesService.excluirCliente(cliente.id!);
      await this.carregarClientes();
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

  formatarTelefone(telefone: string): string {
    if (!telefone) return '';
    const limpo = telefone.replace(/\D/g, '');

    if (limpo.length === 11) {
      return limpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    if (limpo.length === 10) {
      return limpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return telefone;
  }

  formatarCPF(cpf: string): string {
    if (!cpf) return '';
    const limpo = cpf.replace(/\D/g, '');

    if (limpo.length === 11) {
      return limpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return cpf;
  }
}
