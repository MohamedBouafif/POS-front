import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
   constructor(private primengConfig: PrimeNGConfig) {}
    menuBarItems: MenuItem[] | undefined;
    menuItems : MenuItem[] | undefined;
    title = 'pos';
    sidebarVisible= false;
    ngOnInit() {
        this.primengConfig.ripple = true;
        this.menuBarItems = [
            {
              label:'',
              icon:'pi pi-bars',
              command:()=> {
                this.sidebarVisible = !this.sidebarVisible;
              },
            },
            {
              label:'Quit',
              icon:'pi pi-fw pi-sign-out'
            },
            
        ]
        this.menuItems = [
          {
            label : 'Employees',
            icon : 'pi pi-user',
            routerLink: '/employees'
          }
        ]
    }
 

}
