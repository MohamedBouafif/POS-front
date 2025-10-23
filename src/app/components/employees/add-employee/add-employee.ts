import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { EmployeeBase } from '../../../shared/interfaces/EmployeeBase';
import { EmployeeService } from '../../../services/employee';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule, SelectButton } from 'primeng/selectbutton';
import { contract_types } from '../../../shared/enums/contractType';
import { Gender, genders } from '../../../shared/enums/gender';
import { roles } from '../../../shared/enums/roleType';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { emailValidator } from '../../../shared/validators/email-validator.validator';
import { cnssValidator } from '../../../shared/validators/cnss-number-validator.validator';
import { confirmPasswordValidator } from '../../../shared/validators/confirm-password-validator.validator';
import { EmployeeCreate } from '../../../shared/interfaces/employeeCreate';
import { handleForm } from '../../../shared/utilities/handleForm';
import { deepCopy } from '../../../shared/utilities/deepCopy';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    SelectButtonModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    SelectButton,
    PasswordModule,
  ],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
  providers: [MessageService],
  standalone: true,
})
export class AddEmployee {
  loading: boolean = false;
  gender!: Object[];
  contracts!: Object[];
  roles!: Object[];
  addForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private ref: DynamicDialogRef
  ) {
    this.contracts = contract_types;
    this.gender = genders;
    this.roles = roles;
    this.addForm = this.fb.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, emailValidator()]],
        number: [null, [Validators.required, Validators.min(0)]],
        phone_number: [''],
        cnss_number: ['', [Validators.required, cnssValidator()]],
        gender: [Gender.MALE, [Validators.required]],
        roles: [[], [Validators.required]],
        contract_type: ['', [Validators.required]],
        birth_date: [''],
        address: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required],
      },
      { validators: confirmPasswordValidator() }
    );
  }
  ngOnInit() {}
 
  onSubmit() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched()
      return
    }
    this.loading = true
    const employee: EmployeeCreate = handleForm(deepCopy(this.addForm.value))
    if (employee.birth_date) {
      employee.birth_date = formatDate(new Date(employee.birth_date), "yyyy-MM-dd", "en-US")
    } else {
      employee.birth_date = undefined
    }
    this.employeeService.add(employee).subscribe({
      next: (res) => {
        this.loading = false
        if (res.status_code == 200) {
          this.ref.close()
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
