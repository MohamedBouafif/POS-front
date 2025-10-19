import { Routes } from '@angular/router';
import { Employees } from './components/employees/employees/employees';
import { Notfound } from './components/notfound/notfound'
export const routes: Routes = [
    {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: Employees,
  },
  {
    path: '**',
    component: Notfound,
  },
];
