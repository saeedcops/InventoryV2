import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../shared/models/brand';
import { IItemType } from '../../shared/models/item';
import { IPurchasePart } from '../../shared/models/purchase';
import { IWarehouse } from '../../shared/models/warehouse';
import { PurchaseItemService } from '../purchase-item.service';

@Component({
  selector: 'app-purchase-item-add-edit',
  templateUrl: './purchase-item-add-edit.component.html',
  styleUrls: ['./purchase-item-add-edit.component.scss']
})
export class PurchaseItemAddEditComponent implements OnInit {
  empForm: FormGroup;
  parts!: FormArray;
  brands!: IBrand[];
  itemParts!: IPurchasePart[];
  url:string = '';

  constructor(
    private _fb: FormBuilder,
    private _itemService: PurchaseItemService,
    private _dialogRef: MatDialogRef<PurchaseItemAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      partNumber:[null,Validators.required],
      oracleCode: [null, Validators.required],
      model: [null, Validators.required],
      description: [null, Validators.required],
      brandId: [null, Validators.required],
      exceedLimit: [null, Validators.required],
      parts: new FormArray([]),
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

  Addnewrow() {
    this.parts = this.empForm.get("parts") as FormArray;
    this.parts.push(this.Genrow())
  }

  Genrow(): FormGroup {
    return new FormGroup({
      partNumber: new FormControl('', Validators.required),
      count: new FormControl(0)
    });
  }

  Removeitem(index: any) {
    if (this.parts.length > 1) {
      this.parts = this.empForm.get("parts") as FormArray;
      this.parts.removeAt(index)
    } else {
      this.toastr.warning("Item must contains at least 1 parts");
    }
  }

  get addPart() {
    return this.empForm.get("parts") as FormArray;
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.Addnewrow();
    this._itemService.getBrands().subscribe(res =>
    {
      this.brands = res;
      //console.log(res);
    }, err =>
    {
      this.toastr.error(err);
      console.log(err);

    });

    this._itemService.getItemParts().subscribe(res => {
      this.itemParts = res;
     // console.log(res);
    }, err => {
      this.toastr.error(err);
      console.log(err);

    });

  }

  onFormSubmit() {
    console.log(this.empForm.value);
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
