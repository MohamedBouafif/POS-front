import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { employeeBase } from '../../../../interfaces/employeeBase';
import { EmployeeService } from '../../../services/employee';
import { PagedResponse } from '../../../../interfaces/pagedResponse';
import { PaginationFilter } from '../../../../models/paginationFilter';
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
export class Employees implements OnInit {
  employees: employeeBase[] = []; 
  paginationFilter: PaginationFilter;
  selectedEmployees: employeeBase[] = [];
  total_records: number = 0;
  loading: boolean = true;
  rows: number = 10;
  activityValues: number[] = [0, 100];

  constructor(private employeeService: EmployeeService,private cdr: ChangeDetectorRef) {
    this.paginationFilter = new PaginationFilter();
  }

  getEmployees() {
    this.loading = true;
    this.employeeService.getEmployees(this.paginationFilter).subscribe({
      next: (res: PagedResponse<employeeBase>) => {
        if (res.status_code === 200) {
          this.employees = res.list || []; 
          this.total_records = res.total_records || 0;
          this.rows = res.page_size || 10;
          this.loading = false;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.employees = [];
        this.total_records = 0;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnInit() {
    this.getEmployees();
  }

  onPageChanged(e: any) {
    this.paginationFilter = new PaginationFilter(e.first / e.rows + 1, e.rows); 
    this.getEmployees();
  }
}
