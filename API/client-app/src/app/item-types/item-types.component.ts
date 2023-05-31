import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ItemTypesAddEditComponent } from './item-types-add-edit/item-types-add-edit.component';
import { ItemTypesService } from './item-types.service';

@Component({
  selector: 'app-item-types',
  templateUrl: './item-types.component.html',
  styleUrls: ['./item-types.component.scss']
})
export class ItemTypesComponent implements OnInit {

  constructor(private _matDialog: MatDialog,private toaster: ToastrService, private _itemService: ItemTypesService) { }


  openDialog() {
    this._matDialog.open(ItemTypesAddEditComponent);
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
    this.getItemsList();
  }

  openAddEditItemForm() {

    const dialogRef = this._matDialog.open(ItemTypesAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getItemsList();
        }
      },
    });
  }

  getItemsList() {
    this._itemService.getItems().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
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

  deleteItemType(id: number) {
    let data = { 'id': id };
    this._itemService.deleteItems(data).subscribe(
      res => {
        this.toaster.success('ItemType deleted!', 'done');
        this.getItemsList();
        console.log(res);

      },
      error => {
        this.toaster.error("Could't delete the ItemType becuase it's linked to Item!", 'Error');

        console.log(error);
      }
    );
  }

  openEditForm(data: any) {
    const dialogRef = this._matDialog.open(ItemTypesAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getItemsList();
        }
      },
    });
  }
}
