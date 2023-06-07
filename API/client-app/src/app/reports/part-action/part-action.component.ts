import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { IItem } from '../../shared/models/item';
import { IPart } from '../../shared/models/part';
import { ReportsService } from '../reports.service';
@Component({
  selector: 'app-part-action',
  templateUrl: './part-action.component.html',
  styleUrls: ['./part-action.component.scss']
})
export class PartActionComponent implements OnInit {
  private partSource = new ReplaySubject<IPart[]>();
  parts$ = this.partSource.asObservable();
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
        this._reportService.getPartActions(this.reportForm.value).subscribe(
          next => {
            this.partSource.next(next);
             console.log(next);
          },
          error => {
            console.log(error);
          },
        );
      
    }
  
}
