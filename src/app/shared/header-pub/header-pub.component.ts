import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-pub',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-pub.component.html',
  styleUrls: ['./header-pub.component.css']
})
export class HeaderPubComponent { }
