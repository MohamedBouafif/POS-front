import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagedResponse } from '../../interfaces/pagedResponse';
import { employeeBase } from '../../interfaces/employeeBase';
import { baseUrl } from '../../models/baseUrl';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  getEmployees(){
    return this.http.get<PagedResponse<employeeBase>>(baseUrl+'employee/all');
  }
}
