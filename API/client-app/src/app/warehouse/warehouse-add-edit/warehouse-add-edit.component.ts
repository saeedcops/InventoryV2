import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WarehouseService } from '../warehouse.service';


@Component({
  selector: 'app-warehouse-add-edit',
  templateUrl: './warehouse-add-edit.component.html',
  styleUrls: ['./warehouse-add-edit.component.scss']
})
export class WarehouseAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _itemService: WarehouseService,
    private _dialogRef: MatDialogRef<WarehouseAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      id:'',
      name:'',
      description:'',
    });

  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._itemService
          .updatewarehouse(this.empForm.value)
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
        this._itemService.addwarehouse(this.empForm.value).subscribe({
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
