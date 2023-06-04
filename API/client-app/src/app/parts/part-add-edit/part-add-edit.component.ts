import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../shared/models/brand';
import { IItemType } from '../../shared/models/item';
import { IWarehouse } from '../../shared/models/warehouse';
import { PartService } from '../part.service';

@Component({
  selector: 'app-part-add-edit',
  templateUrl: './part-add-edit.component.html',
  styleUrls: ['./part-add-edit.component.scss']
})
export class PartAddEditComponent implements OnInit {
  empForm: FormGroup;

  warehouses!: IWarehouse[];

  dataSet = false;

  constructor(
    private _fb: FormBuilder,
    private _itemService: PartService,
    private _dialogRef: MatDialogRef<PartAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      id:'',
      partNumber:[null,Validators.required],
      oracleCode: [null, Validators.required],
      model:  '',
      description:  '',
      warehouseId: [null, Validators.required],
      image: '',
    });

  }

  getPartById(event: any) {
    if (!this.dataSet) {

      this._itemService.getIPartById(event).subscribe(res => {
        console.log(res);

        this.empForm.patchValue({
          partNumber: res.partNumber,
          oracleCode: res.oracleCode,
          model: res.name,
          description: res.description,
          warehouseId: 2,
          image: res.image,
        });
        this.dataSet = true;
      }, err => { console.log(err); });

    }
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);

    this._itemService.getWarehouses().subscribe(res => {
      this.warehouses = res;
      //console.log(res);
    }, err => {
      this.toastr.error(err);
      console.log(err);

    });
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
        this._itemService.addPart(this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success("Part added successfully","Parts");
            this.dataSet = false;
            this.empForm.reset();
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
