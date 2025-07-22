import { Component, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes-priv.component.html',
  styleUrls: ['./clientes-priv.component.css']
})
export class ClientesPrivComponent {
  clientes: Cliente[] = [];

  private dropdownsInitialized = false;

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

  confirmarAcao(msg: string): boolean {
    return confirm(msg);
  }

  marcarComoFinalizado(cliente: Cliente) {
    if (!this.confirmarAcao(`Finalizar test-drive de ${cliente.nome}?`)) return;
    cliente.status = 'finalizado';
  }

  excluirCliente(cliente: Cliente) {
    if (!this.confirmarAcao(`Excluir ${cliente.nome}?`)) return;
    this.clientes = this.clientes.filter(c => c !== cliente);
    this.resetDropdowns();
  }

  remarcar(cliente: Cliente) {
    cliente.editandoAgendamento = true;
  }
}
