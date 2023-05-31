import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EngineersAddEditComponent } from './engineers-add-edit/engineers-add-edit.component';
import { EngineersService } from './engineers.service';

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.scss']
})
export class EngineersComponent implements OnInit {

  constructor(private _matDialog: MatDialog,private toaster:ToastrService ,private _engineerService: EngineersService) { }

  //loadItems() {
  //  this._customerService.getcustomers();
  //}
  openDialog() {
    this._matDialog.open(EngineersAddEditComponent);
  }


  displayedColumns: string[] = [
    'id',
    'name',
    'phone',
    'email',
    'title',
    'address',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getEngineersList();
  }

  openAddEditForm() {

    const dialogRef = this._matDialog.open(EngineersAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEngineersList();
        }
      },
    });
  }

  getEngineersList() {
    this._engineerService.getEngineers().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //console.log(res.items);
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

  deleteEngineer(id: number) {
    let data = { 'id': id };
    this._engineerService.deleteEngineers(data).subscribe(
      res => {
        this.toaster.success('Engineer deleted!', 'done');
        this.getEngineersList();
        console.log(res);

      },
      error => {
        this.toaster.error("Could't delete the Engineer becuase it's linked to Item!", 'Error');

        console.log(error);
      }
    );
  }

  openEditForm(data: any) {
    const dialogRef = this._matDialog.open(EngineersAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEngineersList();
        }
      },
    });
  }
}
