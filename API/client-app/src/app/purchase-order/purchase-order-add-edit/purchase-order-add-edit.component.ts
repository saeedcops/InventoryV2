import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../shared/models/brand';
import { IItemType } from '../../shared/models/item';
import { IPurchaseItem, IPurchasePart } from '../../shared/models/purchase';
import { PurchaseOrderService } from '../purchase-order.service';

@Component({
  selector: 'app-purchase-order-add-edit',
  templateUrl: './purchase-order-add-edit.component.html',
  styleUrls: ['./purchase-order-add-edit.component.scss']
})
export class PurchaseOrderAddEditComponent implements OnInit {
  empForm: FormGroup;
  items!: FormArray;
  parts!: FormArray;
  purchaseItems!: IPurchaseItem[];
  purchaseParts!: IPurchasePart[];


  constructor(
    private _fb: FormBuilder,
    private _itemService: PurchaseOrderService,
    private _dialogRef: MatDialogRef<PurchaseOrderAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      id:'',
      name: [null, Validators.required],
      parts: new FormArray([]),
      items: new FormArray([])
    });

  }

  Addnewrow(form:string) {
    this.parts = this.empForm.get(form) as FormArray;
    this.parts.push(this.Genrow())
  }

  Genrow(): FormGroup {
    return new FormGroup({
      partNumber: new FormControl('', Validators.required),
      count: new FormControl('', Validators.required)
    });
  }

  Removeitem(index: any,form:string) {
    if (this.parts.length > 1) {
      this.parts = this.empForm.get(form) as FormArray;
      this.parts.removeAt(index)
    } else {
      this.toastr.warning("Item must contains at least 1 parts");
    }
  }
  get addItem() {
    return this.empForm.get("items") as FormArray;
  }

  get addPart() {
    return this.empForm.get("parts") as FormArray;
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    //this.Addnewrow("items");
    //this.Addnewrow("parts");
    this._itemService.getItems().subscribe(res =>
    {
      this.purchaseItems = res;
      //console.log(res);
    }, err =>
    {
      this.toastr.error(err);
      console.log(err);

    });

    this._itemService.getParts().subscribe(res => {
      this.purchaseParts = res;
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
          .updatePurchase(this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success("Purchase detail updated!");
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
        this._itemService.addPurchase(this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success("Purchase added successfully");
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
