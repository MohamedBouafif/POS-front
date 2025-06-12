import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeBase } from '../../../models/interfaces/employeeBase';

import { PagedResponse } from '../../../models/interfaces/pagedResponse';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private http: HttpClient) { }
  getEmployees(){
    return this.http.get<PagedResponse<EmployeeBase>>('/url')
}
}

