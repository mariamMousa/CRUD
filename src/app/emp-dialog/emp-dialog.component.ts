import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-dialog',
  templateUrl: './emp-dialog.component.html',
  styleUrls: ['./emp-dialog.component.scss'],
})
export class EmpDialogComponent implements OnInit {
  empForm!: FormGroup;
  education: string[] = [
    "Bachelor's degree",
    'Graduate Diploma',
    "Master's degree",
    'PHD degree',
  ];
  constructor(
    private _fb: FormBuilder,
    private _empSer: EmployeeService,
    private _empRef: MatDialogRef<EmpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreSer: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experianc: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  formSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empSer
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreSer.openSnackBar('Employee detail updated', 'Done');
              this._empRef.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this._empSer.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreSer.openSnackBar('Employee added successfully');
            this._empRef.close(true);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
