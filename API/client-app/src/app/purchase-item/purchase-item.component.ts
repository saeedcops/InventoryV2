import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PurchaseItemAddEditComponent } from './purchase-item-add-edit/purchase-item-add-edit.component';
import { PurchaseItemService } from './purchase-item.service';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss']
})
export class PurchaseItemsComponent implements OnInit{

  constructor(private _matDialog: MatDialog, private _itemService: PurchaseItemService, private toastr: ToastrService) { }


  openDialog() {
    this._matDialog.open(PurchaseItemAddEditComponent);
  }


  displayedColumns: string[] = [
    'partNumber',
    'oracleCode',
    'localCode',
    'description',
    'model',
    'brand',
    'created',
    'createdBy',
    'exceededLimit',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getItemList();
  }

  openAddEditItemForm() {

    const dialogRef = this._matDialog.open(PurchaseItemAddEditComponent);
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
    this._itemService.getItems().subscribe(
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
    const dialogRef = this._matDialog.open(PurchaseItemAddEditComponent, {
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

  delete(id: number) {
    let data = { 'id': id };
    this._itemService.deleteItem(data).subscribe(
      res => {
        this.toastr.success('Item deleted!', 'done');
        this.getItemList();
        console.log(res);

      },
      error => {
        this.toastr.error("Could't delete the Item becuase it's linked to Order!", 'Error');

        console.log(error);
      }
    );
  }

}
