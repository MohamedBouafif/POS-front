// app.component.ts
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    DrawerModule,
    ButtonModule,
    MenubarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  visible: boolean = false;
  items: MenuItem[] | undefined;
  logoutItem: MenuItem[] | undefined;
  protected readonly title = signal('pos-front');

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: '',
        icon: 'pi pi-align-justify',
        command: () => {
          this.visible = !this.visible; 
        },
      },
    ];
    this.logoutItem = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        iconStyle: { color: 'red' },
      },
    ];
  }

  navigateToEmployees() {
    this.visible = false;
    this.router.navigate(['/employees']);

  }
}