import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-pub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-pub.component.html',
  styleUrls: ['./quiz-pub.component.css'],
})
export class QuizPubComponent {
  constructor(private router: Router) { }

  quizStep: number | 'start' | 'result' = 'start';
  respostas: (string | null)[] = [null, null, null, null];

  perguntas = [
    {
      texto: 'Onde você mais costuma dirigir?',
      opcoes: ['Cidade', 'Estrada', 'Ambos']
    },
    {
      texto: 'Quantas pessoas costumam andar com você?',
      opcoes: ['1', '2', '3', '4 ou mais']
    },
    {
      texto: 'Qual dessas características você mais valoriza?',
      opcoes: ['Tecnologia', 'Espaço interno', 'Design', 'Economia']
    },
    {
      texto: 'Você costuma viajar com frequência?',
      opcoes: ['Sim', 'Não']
    }
  ];

  modeloResultado: string | null = null;

  imagensModelos: Record<string, string> = {
    'Bronco Sport': '../../../../assets/broncoSport_2.jpg',
    'Ranger': '../../../../assets/ranger_2.jpg',
    'Mustang': '../../../../assets/mustang_2.jpg',
    'Territory': '../../../../assets/territory_2.jpg'
  };

  comecarQuiz() {
    this.quizStep = 0;
    this.modeloResultado = null;
  }

  selecionarResposta(opcao: string) {
    if (typeof this.quizStep === 'number') {
      this.respostas[this.quizStep] = opcao;
    }
  }

  avancar() {
    if (typeof this.quizStep === 'number' && this.quizStep < this.perguntas.length - 1) {
      this.quizStep++;
    } else if (this.quizStep === this.perguntas.length - 1) {
      this.calcularResultado();
      this.quizStep = 'result';
    }
  }

  voltar() {
    if (typeof this.quizStep === 'number' && this.quizStep > 0) {
      this.quizStep--;
    }
  }

  reiniciar() {
    this.quizStep = 'start';
    this.respostas = [null, null, null, null];
    this.modeloResultado = null;
  }

  calcularResultado() {
    const pontuacao = {
      'Bronco Sport': 0,
      'Ranger': 0,
      'Mustang': 0,
      'Territory': 0
    };

    type Modelos = 'Bronco Sport' | 'Ranger' | 'Mustang' | 'Territory';

    switch(this.respostas[0]) {
      case 'Cidade':
        pontuacao['Mustang'] += 3;
        pontuacao['Territory'] += 2;
        pontuacao['Bronco Sport'] += 1;
        break;
      case 'Estrada':
        pontuacao['Ranger'] += 3;
        pontuacao['Bronco Sport'] += 2;
        pontuacao['Territory'] += 1;
        break;
      case 'Ambos':
        pontuacao['Bronco Sport'] += 3;
        pontuacao['Ranger'] += 2;
        pontuacao['Territory'] += 1;
        break;
    }

    switch(this.respostas[1]) {
      case '1':
      case '2':
        pontuacao['Mustang'] += 3;
        pontuacao['Bronco Sport'] += 2;
        break;
      case '3':
        pontuacao['Territory'] += 3;
        pontuacao['Bronco Sport'] += 1;
        break;
      case '4 ou mais':
        pontuacao['Ranger'] += 3;
        pontuacao['Territory'] += 2;
        break;
    }

    switch(this.respostas[2]) {
      case 'Tecnologia':
        pontuacao['Territory'] += 3;
        pontuacao['Mustang'] += 2;
        break;
      case 'Espaço interno':
        pontuacao['Ranger'] += 3;
        pontuacao['Bronco Sport'] += 2;
        break;
      case 'Design':
        pontuacao['Mustang'] += 3;
        break;
      case 'Economia':
        pontuacao['Bronco Sport'] += 3;
        pontuacao['Territory'] += 2;
        break;
    }

    switch(this.respostas[3]) {
      case 'Sim':
        pontuacao['Bronco Sport'] += 3;
        pontuacao['Ranger'] += 2;
        break;
      case 'Não':
        pontuacao['Mustang'] += 3;
        break;
    }

    let maxPontos = -1;
    let modelo: Modelos = 'Bronco Sport';

    for (const key of Object.keys(pontuacao) as Modelos[]) {
      if (pontuacao[key] > maxPontos) {
        maxPontos = pontuacao[key];
        modelo = key;
      }
    }

    this.modeloResultado = modelo;
  }

  get perguntaAtual() {
    return typeof this.quizStep === 'number' ? this.perguntas[this.quizStep] : null;
  }

  get respostaAtual() {
    return typeof this.quizStep === 'number' ? this.respostas[this.quizStep] : null;
  }

  irParaComparacao() {
    this.router.navigate(['/comparacao']);
  }
}
