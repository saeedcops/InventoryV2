import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EngineersService } from '../engineers.service';


@Component({
  selector: 'app-engineers-add-edit',
  templateUrl: './engineers-add-edit.component.html',
  styleUrls: ['./engineers-add-edit.component.scss']
})
export class EngineersAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _engineerService: EngineersService,
    private _dialogRef: MatDialogRef<EngineersAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      id: '',
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],
      title: '',
      address: '',
    });

  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._engineerService
          .updatEengineers(this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success("Engineer updated successfully");

              this._dialogRef.close(true);
              console.error(val);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._engineerService.addEngineers(this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success("Engineer added successfully");

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
