import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from '../items/item.service';
import { IOrderDetail } from '../shared/models/order';
import { OrdersAddEditComponent } from './orders-add-edit/orders-add-edit.component';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  status = [this._translate.instant('Returned'),
            this._translate.instant('Ready'),
            this._translate.instant('Delivered')];

  oType = [this._translate.instant('Sell'),
            this._translate.instant('Borrow'),
            this._translate.instant('MaintenanceContract'),
              this._translate.instant('Workshop')];

  constructor(private _matDialog: MatDialog,
    private _orderService: OrdersService,
    private _translate: TranslateService,
    private toastr: ToastrService) { }

  loadItems() {
    this._orderService.getOrders();
  }
  openDialog() {
    this._matDialog.open(OrdersAddEditComponent);
  }


  displayedColumns: string[] = [
    'id',
    'orderType',
    'orderStatus',
    'created',
    'createdBy',
    'customer',
    'engineer',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getOrders();
  }

  openAddEditItemForm() {

    const dialogRef = this._matDialog.open(OrdersAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrders();
        }
      },
    });
  }

  getOrders() {
    this._orderService.getOrders().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       // console.log(res);
      },
      error => {
        //this.toastr.error(error);
      },
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  returnOrder(id: number) {
    console.log(id);
    let data = { 'orderId': id };
    console.log(data);

    this._orderService.returnOrder(data).subscribe(res => {
      this.toastr.success("Order Returned to store","Return");
      this.getOrders();
    }, err => {
     // this.toastr.error(err);

      console.log(err);

    });
  }


}
