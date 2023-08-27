import { transition } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PartAddEditComponent } from './part-add-edit/part-add-edit.component';
import { PartService } from './part.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {

  status = [this._translate.instant('Stored'),
            this._translate.instant('Sold'),
            this._translate.instant('Borrowed'),
            this._translate.instant('Workshop')];

  constructor(private _matDialog: MatDialog, private _translate: TranslateService,
    private _itemService: PartService) { }

  openDialog() {
    this._matDialog.open(PartAddEditComponent);
    
  }


  displayedColumns: string[] = [
    'id',
    'partNumber',
    'oracleCode',
    'localCode',
    'description',
    'partStatus',
    'addVoucher',
    'model',
    'warehouseId',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getItemList();
  }

  openAddEditItemForm() {

    const dialogRef = this._matDialog.open(PartAddEditComponent);
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
    this._itemService.getParts().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      //  console.log(res);
      },
      error => {
       // this.toastr.error(error);
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
    const dialogRef = this._matDialog.open(PartAddEditComponent, {
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
