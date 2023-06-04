import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PurchaseOrderAddEditComponent } from './purchase-order-add-edit/purchase-order-add-edit.component';
import { PurchaseOrderService } from './purchase-order.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit{

  constructor(private _matDialog: MatDialog, private _itemService: PurchaseOrderService, private toastr: ToastrService) { }


  openDialog() {
    this._matDialog.open(PurchaseOrderAddEditComponent);
  }


  displayedColumns: string[] = [
    'id',
    'name',
    'created',
    'createdBy',
    'lastModified',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getItemList();
  }

  openAddEditItemForm() {

    const dialogRef = this._matDialog.open(PurchaseOrderAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          //this.toastr.success("Item Created successfully");

          this.getItemList();
        }
      },
    });
  }

  getItemList() {
    this._itemService.getPurchase().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       // console.log(res.items);
      },
      error => {
        this.toastr.error(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openEditForm(data: any) {
    const dialogRef = this._matDialog.open(PurchaseOrderAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          //this.toastr.success("Item Updated successfully");
          this.getItemList();
        }
      },
    });
  }


}
