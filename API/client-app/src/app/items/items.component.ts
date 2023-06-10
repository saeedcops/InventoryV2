import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ItemAddEditComponent } from './item-add-edit/item-add-edit.component';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit{
 
  status = [this._translate.instant('Stored'),
            this._translate.instant('Sold'),
            this._translate.instant('Borrowed'),
            this._translate.instant('Workshop')];

  constructor(private _matDialog: MatDialog, private _translate: TranslateService,
    private _itemService: ItemService, private toastr: ToastrService) { }

  loadItems() {
    this._itemService.getItems();
  }
  openDialog() {
    this._matDialog.open(ItemAddEditComponent);
  }


  displayedColumns: string[] = [
    'id',
    'brand',
    'description',
    'itemStatus',
    'model',
    'oracleCode',
    'partNumber',
    'serialNumber',
    'warehouse',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getItemList();
  }

  openAddEditItemForm() {

    const dialogRef = this._matDialog.open(ItemAddEditComponent);
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
    const dialogRef = this._matDialog.open(ItemAddEditComponent, {
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
