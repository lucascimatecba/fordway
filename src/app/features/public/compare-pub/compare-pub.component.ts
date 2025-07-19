import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-compare-pub',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './compare-pub.component.html',
  styleUrls: ['./compare-pub.component.css']
})
export class ComparePubComponent {
  veiculo1Selecionado: any = null;
  veiculo2Selecionado: any = null;

  veiculos = [
    {
      nome: 'Ford Ranger',
      imagem: '../../../../assets/ranger_2.jpg',
      preco: 'A partir de R$ 250.000',
      motor: '3.0 V6 (diesel)',
      potencia: '250 cv',
      aceleracao: '9,2 segundos',
      consumo: '9,5 km/l',
      portaMalas: '1250 litros'
    },
    {
      nome: 'Ford Bronco Sport',
      imagem: '../../../../assets/broncoSport_2.jpg',
      preco: 'A partir de R$ 222.045',
      motor: '2.0 EcoBoost (gasolina)',
      potencia: '253 cv',
      aceleracao: '8 segundos',
      consumo: '9,5 km/l',
      portaMalas: '580 litros'
    },
    {
      nome: 'Ford Mustang',
      imagem: '../../../../assets/mustang_2.jpg',
      preco: 'A partir de R$ 529.000',
      motor: '5.0 V8 (gasolina)',
      potencia: '483 cv',
      aceleracao: '4,3 segundos',
      consumo: '7,45 km/l',
      portaMalas: '382 litros'
    },
    {
      nome: 'Ford Territory',
      imagem: '../../../../assets/territory_2.jpg',
      preco: 'A partir de R$ 222.045',
      motor: '1.5 Turbo (gasolina)',
      potencia: '169 cv',
      aceleracao: '11,8 segundos',
      consumo: '10,3 km/l',
      portaMalas: '448 litros'
    }
  ];

  infos = [
    { label: 'Preço', campo: 'preco' },
    { label: 'Motor', campo: 'motor' },
    { label: 'Potência', campo: 'potencia' },
    { label: 'Aceleração (0-100km/h)', campo: 'aceleracao' },
    { label: 'Consumo Médio', campo: 'consumo' },
    { label: 'Porta-malas', campo: 'portaMalas' }
  ];

  veiculosSelecionadosValidos(): boolean {
    return (
      this.veiculo1Selecionado &&
      this.veiculo2Selecionado &&
      this.veiculo1Selecionado.nome !== this.veiculo2Selecionado.nome
    );
  }

  limparComparacao(): void {
    this.veiculo1Selecionado = null;
    this.veiculo2Selecionado = null;
  }
}
