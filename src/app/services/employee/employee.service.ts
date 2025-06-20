import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { EmployeeBase } from '../../../models/interfaces/employeeBase';
import { Observable, throwError } from 'rxjs';

import { PagedResponse } from '../../../models/interfaces/pagedResponse';
import { baseUrl } from '../../../models/baseUrl';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private http: HttpClient) { }
  getEmployees(){
    return this.http.get<PagedResponse<EmployeeBase>>(baseUrl + 'employee/all')
}
}

