import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { EmployeeBase } from '../../models/interfaces/employeeBase';
import { Observable } from 'rxjs';
import { EmployeeService } from '../services/employee/employee.service'
import { PagedResponse } from '../../models/interfaces/pagedResponse';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
    employees!: EmployeeBase[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;

    constructor(private employeeService: EmployeeService) {}

    ngOnInit() {
        this.employeeService.getEmployees().subscribe((res : PagedResponse<EmployeeBase>) => {
            this.employees = res.list;
            this.loading = false;  
        });
    }

    
}
