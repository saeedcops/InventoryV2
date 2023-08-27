import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../shared/models/brand';
import { ICustomer } from '../../shared/models/customer';
import { IEngineer } from '../../shared/models/engineer';
import { IItem, IItemType } from '../../shared/models/item';
import { IPartNumber } from '../../shared/models/order';
import { IPart } from '../../shared/models/part';
import { IPurchaseItem, IPurchasePart } from '../../shared/models/purchase';
import { IWarehouse } from '../../shared/models/warehouse';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-add-edit',
  templateUrl: './orders-add-edit.component.html',
  styleUrls: ['./orders-add-edit.component.scss']
})
export class OrdersAddEditComponent implements OnInit {

  constructor(private orderService: OrdersService,
    private _dialogRef: MatDialogRef<OrdersAddEditComponent>,

    private toastr: ToastrService) { }

  engineers!: IEngineer[];
  customers!: ICustomer[];
  items!: FormArray;
  parts!: FormArray;
  orderItems!: IPartNumber[];
  orderParts!: IPartNumber[];

  ngOnInit(): void {
    this.orderService.getCustomers().subscribe(res => { this.customers = res; }, err => { console.log(err); });
    this.orderService.getEngineers().subscribe(res => { this.engineers = res; }, err => { console.log(err); });
    this.orderService.getItems().subscribe(res => {
      this.orderItems = res;
      //console.log(res);
    }, err => {
      this.toastr.error(err);
      console.log(err);

    });

    this.orderService.getParts().subscribe(res => {
      this.orderParts = res;
      // console.log(res);
    }, err => {
      this.toastr.error(err);
      console.log(err);

    });
    //this.Addnewrow('items');
    //this.Addnewrow('parts');
  }

  title = 'FormArray';
 // items!: FormArray;

  reactform = new FormGroup({
    customerId: new FormControl('', Validators.required),
    engineerId: new FormControl('', Validators.required),
    orderType: new FormControl('', Validators.required),
    exchangeId: new FormControl('', Validators.required),
    exchangeVoucher: new FormControl('', Validators.required),
    items: new FormArray([]),
    parts: new FormArray([]),
  });

  ProceedSave() {
    console.log(this.reactform.value);
    if (this.reactform.valid)
      this.orderService.addOrder(this.reactform.value).subscribe(res => {
        this.toastr.success("Order created successfully!");
        this._dialogRef.close(true);
      }, er => {
       // this.toastr.error("Order must contains at least 1 item");

        console.log(er);
      });
  }

  Addnewrow(form: string) {
    this.items = this.reactform.get(form) as FormArray;
    this.items.push(this.Genrow())
  }

  Removeitem(index: any, form: string) {
    //if (this.items.length > 1) {
      this.items = this.reactform.get(form) as FormArray;
      this.items.removeAt(index)
    //} else {
    //  this.toastr.warning("Order must contains at least 1 item");
    //}
  }

  get addParts() {
    return this.reactform.get("parts") as FormArray;
  }

  get addItems() {
    return this.reactform.get("items") as FormArray;
  }

  Genrow(): FormGroup {
    return new FormGroup({
      count: new FormControl('', Validators.required),
      partNumber: new FormControl('', Validators.required)
    });
  }


}
