import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { IPart } from '../../shared/models/part';
import { ReportsService } from '../reports.service';
@Component({
  selector: 'app-part-stocktaking',
  templateUrl: './part-stocktaking.component.html',
  styleUrls: ['./part-stocktaking.component.scss']
})
export class PartStocktakingComponent implements OnInit {

  status = [this._translate.instant('Stored'),
            this._translate.instant('Sold'),
            this._translate.instant('Borrowed'),
             this._translate.instant('Workshop')];

  private partSource = new ReplaySubject<IPart[]>();
  parts$ = this.partSource.asObservable();

  constructor(private _reportService: ReportsService, private _translate: TranslateService) {

  }

  ngOnInit(): void {
    this._reportService.getPartStock().subscribe(
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
