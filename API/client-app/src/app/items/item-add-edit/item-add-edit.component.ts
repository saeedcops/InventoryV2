import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../shared/models/brand';
import { IItemType } from '../../shared/models/item';
import { IWarehouse } from '../../shared/models/warehouse';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-add-edit',
  templateUrl: './item-add-edit.component.html',
  styleUrls: ['./item-add-edit.component.scss']
})
export class ItemAddEditComponent implements OnInit {
  empForm: FormGroup;

  brands!: IBrand[];
  itemTypes!: IItemType[];
  warehouses!: IWarehouse[];


  constructor(
    private _fb: FormBuilder,
    private _itemService: ItemService,
    private _dialogRef: MatDialogRef<ItemAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      id:'',
      partNumber:[null,Validators.required],
      oracleCode:'',
      serialNumber: [null, Validators.required],
      model:  '',
      description:  '',
      itemTypeId: [null, Validators.required],
      brandId: [null, Validators.required],
      warehouseId: [null, Validators.required],
      image: '',
    });

  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this._itemService.getBrands().subscribe(res =>
    {
      this.brands = res;
      //console.log(res);
    }, err =>
    {
      this.toastr.error(err);
      console.log(err);

    });

    this._itemService.getItemTypes().subscribe(res => {
      this.itemTypes = res;
     // console.log(res);
    }, err => {
      this.toastr.error(err);
      console.log(err);

    });


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
          .updateItem(this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success("Item detail updated!");
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
        this._itemService.addItems(this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success("Item added successfully");
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
