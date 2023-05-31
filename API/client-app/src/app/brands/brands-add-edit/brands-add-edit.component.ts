import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../brands.service';


@Component({
  selector: 'app-brands-add-edit',
  templateUrl: './brands-add-edit.component.html',
  styleUrls: ['./brands-add-edit.component.scss']
})
export class BrandsAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _brandsService: BrandsService,
    private _dialogRef: MatDialogRef<BrandsAddEditComponent>,
    private toastr: ToastrService,
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
        this._brandsService
          .updateBrands(this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success('Brand detail updated!');
              this._dialogRef.close(true);
              console.error(val);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._brandsService.addBrands(this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Brand Added successflly!');
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
