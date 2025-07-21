// clientes-priv.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cliente {
  nome: string;
  telefone: string;
  cpf: string;
  cidade: string;
  status: 'nao_contatado' | 'marcado' | 'finalizado';
  agendamento?: string;
  remarcar?: boolean;
}

@Component({
  selector: 'app-clientes-priv',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './clientes-priv.component.html',
  styleUrls: ['./clientes-priv.component.css']
})
export class ClientesPrivComponent {
  activeTab = 0;

  abas = [
    { label: 'Não Contatados', clientes: [] as Cliente[], status: 'nao_contatado' },
    { label: 'Marcados', clientes: [] as Cliente[], status: 'marcado' },
    { label: 'Finalizados', clientes: [] as Cliente[], status: 'finalizado' },
  ];

  ngOnInit() {
    // Exemplo estático; futuramente carregar via serviço/API
    this.abas[0].clientes = [
      { nome:'João',telefone:'(11)12345-6789',cpf:'000.000.000-00',cidade:'São Paulo',status:'nao_contatado'},
      { nome:'Maria',telefone:'(21)98765-4321',cpf:'111.111.111-11',cidade:'Rio',status:'nao_contatado'}
    ];
  }

  confirmarAção(msg: string): boolean {
    return confirm(msg);
  }

  moverParaMarcados(c: Cliente) {
    if (!this.confirmarAção(`Confirmar contato com ${c.nome}?`)) return;
    c.status = 'marcado';
    this.abas[1].clientes.push(c);
    this.abas[0].clientes = this.abas[0].clientes.filter(x => x !== c);
  }

  cancelarAgendamento(c: Cliente) {
    if (!this.confirmarAção(`Cancelar agendamento de ${c.nome}?`)) return;
    c.status = 'nao_contatado';
    c.remarcar = true;
    this.abas[0].clientes.push(c);
    this.abas[1].clientes = this.abas[1].clientes.filter(x => x !== c);
  }

  finalizarOuExcluir(c: Cliente, tab: number) {
    if (tab === 1) {
      if (!this.confirmarAção(`Finalizar test-drive de ${c.nome}?`)) return;
      c.status = 'finalizado';
      this.abas[2].clientes.push(c);
      this.abas[1].clientes = this.abas[1].clientes.filter(x => x !== c);
    } else if (tab === 2) {
      if (!this.confirmarAção(`Excluir ${c.nome}?`)) return;
      this.abas[2].clientes = this.abas[2].clientes.filter(x => x !== c);
    }
  }
}
