import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IItem } from '../../shared/models/item';
import { ReportsService } from '../reports.service';
@Component({
  selector: 'app-item-action',
  templateUrl: './item-action.component.html',
  styleUrls: ['./item-action.component.scss']
})
export class ItemActionComponent implements OnInit {
  status = [this._translate.instant('Stored'),
            this._translate.instant('Sold'),
            this._translate.instant('Borrowed'),
            this._translate.instant('Workshop')];
  private itemSource = new ReplaySubject<IItem[]>();
  items$ = this.itemSource.asObservable();
  reportForm: FormGroup;

  constructor(private _reportService: ReportsService,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private _translate: TranslateService) {

    this.reportForm = this._fb.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
      partNumber: [null, Validators.required]
    });

  }

  ngOnInit(): void {
  }

  

  onFormSubmit() {
    if (this.reportForm.valid) {


      this.reportForm.value.from = this.datePipe.transform(this.reportForm.value.from.toDateString(), "dd-MM-yyyy");
      this.reportForm.value.to = this.datePipe.transform(this.reportForm.value.to.toDateString(), "dd-MM-yyyy");

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
  
}
