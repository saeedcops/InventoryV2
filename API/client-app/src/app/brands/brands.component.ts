import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { BrandsAddEditComponent } from "./brands-add-edit/brands-add-edit.component";
import { BrandsService } from "./brands.service";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private _matDialog: MatDialog, private toster:ToastrService,private _brandService: BrandsService) { }

  loadItems() {
    this._brandService.getBrands();
  }
  openDialog() {
    this._matDialog.open(BrandsAddEditComponent);
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
    this.getBrandList();
  }

  openAddEditForm() {

    const dialogRef = this._matDialog.open(BrandsAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBrandList();
        }
      },
    });
  }

  getBrandList() {
    this._brandService.getBrands().subscribe({
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

  deleteBrand(id: number) {
    let data = { 'id': id };
    this._brandService.deleteBrands(data).subscribe(
      res => {
        this.toster.success('Brand deleted!', 'done');
        this.getBrandList();
        console.log(res);

      },
      error => {
        this.toster.error("Could't delete the Brand becuase it's linked to Item!", 'Error');

        console.log(error);
      }
    );
  }

  openEditForm(data: any) {
    const dialogRef = this._matDialog.open(BrandsAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBrandList();
        }
      },
    });
  }
}
