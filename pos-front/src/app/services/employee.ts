import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../interfaces/pagedResponse';
import { employeeBase } from '../../interfaces/employeeBase';
import { baseUrl } from '../../models/baseUrl';
import { PaginationFilter } from '../../models/paginationFilter';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  getEmployees(paginationFilter:PaginationFilter){
    let params = new HttpParams()
    .set("page_size",paginationFilter.page_size)
    .set("page_number", paginationFilter.page_number);
    
    const httpOptions = {params};
    const endPointUrl = baseUrl+'employee/all';
    
    return this.http.get<PagedResponse<employeeBase>>(endPointUrl, httpOptions);
  }
}
