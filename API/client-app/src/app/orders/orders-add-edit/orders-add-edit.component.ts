import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../shared/models/brand';
import { ICustomer } from '../../shared/models/customer';
import { IEngineer } from '../../shared/models/engineer';
import { IItemType } from '../../shared/models/item';
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
  ngOnInit(): void {
    this.orderService.getCustomers().subscribe(res => { this.customers = res; }, err => { console.log(err); });
    this.orderService.getEngineers().subscribe(res => { this.engineers = res; }, err => { console.log(err); });
    this.Addnewrow();
  }

  title = 'FormArray';
  items!: FormArray;
  reactform = new FormGroup({
    customerId: new FormControl('', Validators.required),
    engineerId: new FormControl('', Validators.required),
    orderType: new FormControl('', Validators.required),
    orderItemsPartNumber: new FormArray([])
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

  Addnewrow() {
    this.items = this.reactform.get("orderItemsPartNumber") as FormArray;
    this.items.push(this.Genrow())
  }
  Removeitem(index: any) {
    if (this.items.length > 1) {
      this.items = this.reactform.get("orderItemsPartNumber") as FormArray;
      this.items.removeAt(index)
    } else {
      this.toastr.warning("Order must contains at least 1 item");
    }
  }

  get addPartNumber() {
    return this.reactform.get("orderItemsPartNumber") as FormArray;
  }

  Genrow(): FormGroup {
    return new FormGroup({
      count: new FormControl('', Validators.required),
      partNumber: new FormControl('', Validators.required)
    });
  }


}
