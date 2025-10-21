import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { EmployeeBase } from '../../../shared/interfaces/EmployeeBase';
import { EmployeeService } from '../../../services/employee';
import { PagedResponse } from '../../../shared/interfaces/pagedResponse';
import { EmployeeFilter } from '../../../shared/models/employeeFilter';
import { FloatLabel } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DialogService, DynamicDialogRef , DynamicDialogModule} from 'primeng/dynamicdialog';
import { AddEmployee } from '../add-employee/add-employee';
import { ImportEmployees } from '../../import-employees/import-employees';

@Component({
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
    SelectModule,
    FloatLabel,
    ReactiveFormsModule,
    DynamicDialogModule,
  ],

  providers: [DialogService],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
  standalone: true,
})
export class Employees implements OnInit {
  employees: EmployeeBase[] = [];
  employeePagination: EmployeeFilter;
  selectedEmployees: EmployeeBase[] = [];
  total_records: number = 0;
  loading: boolean = true;
  rows: number = 10;
  activityValues: number[] = [0, 100];
  employeeFilterForm: FormGroup;
  ref: DynamicDialogRef | null | undefined;

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    public dialogService: DialogService
  ) {
    this.employeePagination = new EmployeeFilter();
    this.employeeFilterForm = this.fb.group({
      name_substr: [''],
    });
  }

  ngOnInit() {
    this.getEmployees();
    this.employeeFilterForm
      .get('name_substr')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.employeePagination.page_number = 1;
        this.employeePagination.name_substr = value || undefined;
        this.getEmployees();
      });
  }

  getEmployees() {
    this.loading = true;
    this.employeeService.getEmployees(this.employeePagination).subscribe({
      next: (res: PagedResponse<EmployeeBase>) => {
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
      },
    });
  }

  onPageChanged(e: any) {
    this.employeePagination = new EmployeeFilter(
      e.first / e.rows + 1,
      e.rows,
      this.employeePagination.name_substr
    );
    this.getEmployees();
  }
  openAddEmployeeDialog() {
    this.ref = this.dialogService.open(AddEmployee, {
      header: 'Add Employee',
      width: '50%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      closable: true, // Enable default close button
    });
    this.ref?.onClose.subscribe((data: any) => {
      this.getEmployees();
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  openImportEmployeesDialog(){
      console.log('open ref:', this.ref);

    this.ref=this.dialogService.open(ImportEmployees,{
      header: 'Import Employees',
      baseZIndex: 10000,
      closable: true, // Enable default close button
    });
      console.log('Dialog ref:', this.ref);

    this.ref?.onClose.subscribe((data: any) => {
      this.getEmployees();
    });
  }
}
