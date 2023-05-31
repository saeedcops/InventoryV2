import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { WarehouseAddEditComponent } from './warehouse-add-edit/warehouse-add-edit.component';
import { WarehouseService } from './warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  constructor(private _matDialog: MatDialog, private toastr: ToastrService, private _warehouseService: WarehouseService) { }


  openDialog() {
    this._matDialog.open(WarehouseAddEditComponent);
  }


  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getWarehouseList();
  }

  openAddEditItemForm() {

    const dialogRef = this._matDialog.open(WarehouseAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getWarehouseList();
        }
      },
    });
  }

  getWarehouseList() {
    this._warehouseService.getwarehouse().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res.items);
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteWarehouse(id: number) {
    let data = { 'id': id };
    this._warehouseService.deletewarehouse(data).subscribe(
      res => {
        this.toastr.success('Warehouse deleted!', 'done');
        this.getWarehouseList();
        console.log(res);

      },
      error => {
        this.toastr.error("Could't delete the Warehouse becuase it's linked to Item!", 'Error');

        console.log(error);
        }
    );
  }

  openEditForm(data: any) {
    const dialogRef = this._matDialog.open(WarehouseAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getWarehouseList();
        }
      },
    });
  }
}
