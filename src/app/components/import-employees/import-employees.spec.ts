import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEmployees } from './import-employees';

describe('ImportEmployees', () => {
  let component: ImportEmployees;
  let fixture: ComponentFixture<ImportEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportEmployees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportEmployees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
