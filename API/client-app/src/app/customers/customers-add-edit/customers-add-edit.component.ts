import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../customers.service';


@Component({
  selector: 'app-customers-add-edit',
  templateUrl: './customers-add-edit.component.html',
  styleUrls: ['./customers-add-edit.component.scss']
})
export class CustomersAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _customerService: CustomersService,
    private _dialogRef: MatDialogRef<CustomersAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      id:'',
      name:[null,Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required, Validators.email],
      address:'',
    });

  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._customerService
          .updatecustomers(this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success("Customer detail updated!");
              //this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
              console.error(val);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._customerService.addcustomers(this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success("Customer added successfully");

            //this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
            console.error(val);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
