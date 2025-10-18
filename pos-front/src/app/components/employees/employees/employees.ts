import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { employeeBase } from '../../../../interfaces/employeeBase';
import { EmployeeService } from '../../../services/employee';
import { PagedResponse } from '../../../../interfaces/pagedResponse';
@Component({
  standalone: true,
  selector: 'app-employees',
  imports: [
    TableModule,
    
    ButtonModule,


    CommonModule,
    MultiSelectModule,
    InputTextModule,
    SelectModule,
    

  ],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  employees!: employeeBase[];

  selectedEmployees!: employeeBase[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private EmployeeService: EmployeeService) {}

  ngOnInit() {
    this.EmployeeService.getEmployees().subscribe((res: PagedResponse<employeeBase>) => {
      this.employees = res.list;
      this.loading = false;
    });
  }
}
