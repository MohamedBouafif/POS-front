import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../shared/interfaces/pagedResponse';
import { EmployeeBase } from '../shared/interfaces/EmployeeBase';
import { baseUrl } from '../shared/models/baseUrl';
import { EmployeeFilter } from '../shared/models/employeeFilter';
import { EmployeeCreate } from '../shared/interfaces/employeeCreate';
import { Observable, ObservedValueOf } from 'rxjs';
import { BaseOut } from '../shared/interfaces/baseOut';
import { ImportPossibleFields } from '../shared/interfaces/importPossibleFields';
import { MatchyUploadEntry } from '../shared/interfaces/matchyUploadEntry';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  getEmployees(employeeFilter: EmployeeFilter) {
    let params = new HttpParams()
      .set('page_size', employeeFilter.page_size)
      .set('page_number', employeeFilter.page_number);
    if (employeeFilter.name_substr !== undefined) {
      params = params.set('name_substr', employeeFilter.name_substr);
    }
    const endPointUrl = baseUrl + 'employee/all';

    return this.http.get<PagedResponse<EmployeeBase>>(endPointUrl, { params });
  }

  add(employeeCreate: EmployeeCreate): Observable<BaseOut> {
    const endPointUrl = baseUrl + 'employee';
    const httpOptions = {};
    return this.http.post<BaseOut>(endPointUrl, employeeCreate, httpOptions);
  }

  getOptions(){
    const endPointUrl = baseUrl + 'employee/possibleImportFields';
    return this.http.get<ImportPossibleFields>(endPointUrl);
  }

  upload(data:MatchyUploadEntry){
        const endPointUrl = baseUrl + 'employee/csv';

    return this.http.post<BaseOut>(endPointUrl,data);
  }
}
