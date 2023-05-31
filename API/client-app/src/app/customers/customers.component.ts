import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CustomersAddEditComponent } from './customers-add-edit/customers-add-edit.component';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private _matDialog: MatDialog, private toaster:ToastrService,private _customerService: CustomersService) { }

  //loadItems() {
  //  this._customerService.getcustomers();
  //}
  openDialog() {
    this._matDialog.open(CustomersAddEditComponent);
  }


  displayedColumns: string[] = [
    'id',
    'name',
    'phone',
    'email',
    'address',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getCustomersList();
  }

  openAddEditForm() {

    const dialogRef = this._matDialog.open(CustomersAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomersList();
        }
      },
    });
  }

  getCustomersList() {
    this._customerService.getcustomers().subscribe({
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

  deleteCustomer(id: number) {
    let data = { 'id': id };
    this._customerService.deletecustomers(data).subscribe(
      res => {
        this.toaster.success('Customer deleted!', 'done');
        this.getCustomersList();
        console.log(res);

      },
      error => {
        this.toaster.error("Could't delete the Customer becuase it's linked to Item!", 'Error');

        console.log(error);
      }
    );
  }

  openEditForm(data: any) {
    const dialogRef = this._matDialog.open(CustomersAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomersList();
        }
      },
    });
  }
}
