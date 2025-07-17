// footer-pub.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-pub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-pub.component.html',
  styleUrls: ['./footer-pub.component.css']
})
export class FooterPubComponent {
  anoAtual = new Date().getFullYear();
}
