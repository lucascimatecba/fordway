import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-pub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-pub.component.html',
  styleUrls: ['./quiz-pub.component.css']
})
export class QuizPubComponent {
  quizStep: number | 'start' | 'result' = 'start';

  respostas: (string | undefined)[] = [];

  perguntas = [
    {
      texto: 'Onde você mais dirige?',
      opcoes: ['Cidade', 'Estrada', 'Misto'],
      imagens: [] // imagens para adicionar futuramente
    },
    {
      texto: 'Quantas pessoas andam com você no carro?',
      opcoes: ['1-2', '3-4', '5 ou mais'],
      imagens: []
    },
    {
      texto: 'O que mais valoriza?',
      opcoes: ['Estilo', 'Conforto', 'Potência', 'Economia'],
      imagens: []
    },
    {
      texto: 'Você usa tecnologia no dia a dia?',
      opcoes: ['Sim', 'Não'],
      imagens: []
    }
  ];

  resultadoImagem = 'assets/imgs/result-default.png'; // Imagem default do resultado

  // Getter para pegar a pergunta atual só se quizStep for número válido
  get perguntaAtual() {
    if (
      typeof this.quizStep === 'number' &&
      this.quizStep >= 0 &&
      this.quizStep < this.perguntas.length
    ) {
      return this.perguntas[this.quizStep];
    }
    return null;
  }

  proximo() {
    if (this.quizStep === 'start') {
      this.quizStep = 0;
    } else if (typeof this.quizStep === 'number') {
      if (this.quizStep < this.perguntas.length - 1) {
        this.quizStep++;
      } else {
        this.quizStep = 'result';
        this.calcularResultado();
      }
    }
  }

  anterior() {
    if (typeof this.quizStep === 'number' && this.quizStep > 0) {
      this.quizStep--;
    }
  }

  selecionarResposta(opcao: string, step: number) {
    this.respostas[step] = opcao;
  }

  respostaAtiva(opcao: string, step: number) {
    return this.respostas[step] === opcao;
  }

  calcularResultado() {
    // Aqui pode implementar a lógica do resultado baseado nas respostas
    this.resultadoImagem = 'assets/imgs/ford-kuga.png'; // exemplo estático
  }
}
