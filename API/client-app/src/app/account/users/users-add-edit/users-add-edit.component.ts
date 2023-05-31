import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-users-add-edit',
  templateUrl: './users-add-edit.component.html',
  styleUrls: ['./users-add-edit.component.scss']
})
export class UsersAddEditComponent implements OnInit {
  empForm: FormGroup;
  role$ !:  Observable<string[]>;
  constructor(
    private _fb: FormBuilder,
    private _itemService: AccountService,
    private _dialogRef: MatDialogRef<UsersAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      username:'',
      password:'',
      role:'',
    });

  }

  ngOnInit(): void {
    this._itemService.getRoles();
    this.empForm.patchValue(this.data);
    this.role$ = this._itemService.role$;
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data?.status == null) {
        this._itemService
          .register(this.empForm.value)
          .subscribe({
            next: (val: any) => {
              //this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
              console.error(val);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        if (this.data.status) {
          this._itemService
            .athorizeUser(this.empForm.value)
            .subscribe({
              next: (val: any) => {
                //this._coreService.openSnackBar('Employee detail updated!');
                this._dialogRef.close(true);
                console.error(val);
              },
              error: (err: any) => {
                console.error(err);
              },
            });
        } else {

          this._itemService.revokeUser(this.empForm.value).subscribe({
            next: (val: any) => {
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
}
