import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { IItem } from '../../shared/models/item';
import { ReportsService } from '../reports.service';
@Component({
  selector: 'app-item-action',
  templateUrl: './item-action.component.html',
  styleUrls: ['./item-action.component.scss']
})
export class ItemActionComponent implements OnInit {
  private itemSource = new ReplaySubject<IItem[]>();
  items$ = this.itemSource.asObservable();
  reportForm: FormGroup;
  constructor(private _reportService: ReportsService,  private _fb: FormBuilder,) {

    this.reportForm = this._fb.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
      partNumber: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }


  onFormSubmit() {

        console.log(this.reportForm.value);
        this._reportService.getItemActions(this.reportForm.value).subscribe(
          next => {
            this.itemSource.next(next);
             console.log(next);
          },
          error => {
            console.log(error);
          },
        );
      
    }
  
}
