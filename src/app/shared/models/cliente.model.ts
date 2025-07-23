export interface Cliente {
  id?: string;
  nome: string;
  telefone: string;
  cpf: string;
  cidade: string;
  status: 'nao_contatado' | 'marcado' | 'finalizado';
  createdAt?: Date;
  agendamento?: string;
}