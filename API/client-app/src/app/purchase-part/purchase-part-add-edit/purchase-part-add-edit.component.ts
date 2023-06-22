import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../shared/models/brand';
import { IItemType } from '../../shared/models/item';
import { IWarehouse } from '../../shared/models/warehouse';
import { PurchasePartService } from '../purchase-part.service';

@Component({
  selector: 'app-purchase-part-add-edit',
  templateUrl: './purchase-part-add-edit.component.html',
  styleUrls: ['./purchase-part-add-edit.component.scss']
})
export class PurchasePartAddEditComponent implements OnInit {
  empForm: FormGroup;
  url: string = '';

  constructor(
    private _fb: FormBuilder,
    private _itemService: PurchasePartService,
    private _dialogRef: MatDialogRef<PurchasePartAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      partNumber:[null,Validators.required],
      oracleCode: '',
      name: [null, Validators.required],
      description: [null, Validators.required],
      exceededLimit: [null, Validators.required],
      image: { value: '', disabled: false }
    });

  }

  GetFileOnLoad(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.empForm.controls['image'].setValue(reader.result!.toString().split(',')[1]);
      console.log(reader.result!.toString().split(',')[1]);
      this.url = reader.result!.toString();
    };
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._itemService
          .updatePart(this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success("Part detail updated!");
              //this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
             // console.error(val);
            },
            error: (err: any) => {
              this.toastr.error(err);
              console.error(err);
            },
          });
      } else {
        console.log(this.empForm.value);
        this._itemService.addParts(this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success("Part added successfully");
            //this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
           // console.error(val);
          },
          error: (err: any) => {
            this.toastr.error(err);
            console.error(err);
          },
        });
      }
    }
  }
}
