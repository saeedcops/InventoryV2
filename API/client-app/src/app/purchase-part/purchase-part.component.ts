import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PurchasePartAddEditComponent } from './purchase-part-add-edit/purchase-part-add-edit.component';
import { PurchasePartService } from './purchase-part.service';

@Component({
  selector: 'app-purchase-part',
  templateUrl: './purchase-part.component.html',
  styleUrls: ['./purchase-part.component.scss']
})
export class PurchasePartComponent implements OnInit{

  constructor(private _matDialog: MatDialog, private _itemService: PurchasePartService, private toastr: ToastrService) { }


  openDialog() {
    this._matDialog.open(PurchasePartAddEditComponent);
  }


  displayedColumns: string[] = [
    'partNumber',
    'oracleCode',
    'description',
    'exceedLimit',
    'name',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getItemList();
  }

  openAddEditItemForm() {

    const dialogRef = this._matDialog.open(PurchasePartAddEditComponent);
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
    this._itemService.getIParts().subscribe(
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
    const dialogRef = this._matDialog.open(PurchasePartAddEditComponent, {
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

  openView(id: string) {
    this.toastr.success("Item Updated "+id);
  }
}
