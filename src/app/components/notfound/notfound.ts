// notfound.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-notfound',
  imports: [CommonModule, RouterLink, RouterModule, ButtonModule, CardModule],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class Notfound {}