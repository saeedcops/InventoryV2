import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemTypesService } from '../item-types.service';
//import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-types-add-edit',
  templateUrl: './item-types-add-edit.component.html',
  styleUrls: ['./item-types-add-edit.component.scss']
})
export class ItemTypesAddEditComponent implements OnInit {
  empForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private _itemService: ItemTypesService,
    private _dialogRef: MatDialogRef<ItemTypesAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      id:'',
      name:'',
      description: '',

    });

  }

  ngOnInit(): void {
    console.log(this.data);
    this.empForm.patchValue(this.data);
    console.log(this.empForm.value);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {

        console.log("Data");
        this._itemService
          .updateItems(this.empForm.value)
          .subscribe({
            next: (val: any) => {
              //this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
              console.log(val);
            },
            error: (err: any) => {
              console.error(err);
            },
          });

      } else {
        this._itemService.addItems(this.empForm.value).subscribe({
          next: (val: any) => {
            //this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
            console.log(val);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
