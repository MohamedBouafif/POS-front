import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../services/employee';
import { Option } from '../../../libs/matchy/src/models/classes/option';
import { ImportPossibleFields } from '../../shared/interfaces/importPossibleFields';
import { Matchy } from '../../../libs/matchy/src/main';
import { MatchyUploadEntry } from '../../shared/interfaces/matchyUploadEntry';
@Component({
  selector: 'app-import-employees',
  imports: [],
  templateUrl: './import-employees.html',
  styleUrl: './import-employees.css',
  standalone: true,
})
export class ImportEmployees implements OnInit {
  constructor(private ref: DynamicDialogRef, private employeeService: EmployeeService) {}
  ngOnInit() {
    this.loadMatchyLib();
  }

  getOptions() {}

  loadMatchyLib() {
    this.employeeService.getOptions()?.subscribe((data: ImportPossibleFields) => {
      const matchy = new Matchy(data.possible_fields);

      document.getElementById('matchy')?.appendChild(matchy);

      matchy.submit = async (data: MatchyUploadEntry) => {
        this.employeeService.upload(data).subscribe({
          next: (response) => {
            console.log('Success:', response);
          },
          error: (error) => {
            console.error('Error:', error); // Log the full error response
          },
        });
      };
    });
  }
}
