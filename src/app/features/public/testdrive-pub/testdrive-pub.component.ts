import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AfterViewInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-testdrive-pub',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './testdrive-pub.component.html',
  styleUrl: './testdrive-pub.component.css',
})
export class TestdrivePubComponent implements AfterViewInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      aceite: [false, [Validators.requiredTrue]],
    });
  }

  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#carouselExample');
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: 'carousel',
        pause: false
      });
    }
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Dados enviados:', this.form.value);
    }
  }
}
