import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { IItem } from '../../shared/models/item';
import { ReportsService } from '../reports.service';
@Component({
  selector: 'app-item-stocktaking',
  templateUrl: './item-stocktaking.component.html',
  styleUrls: ['./item-stocktaking.component.scss']
})
export class ItemStocktakingComponent implements OnInit {
  
  status = [this._translate.instant('Stored'),
            this._translate.instant('Sold'),
            this._translate.instant('Borrowed'),
            this._translate.instant('Workshop')];
  private itemSource = new ReplaySubject<IItem[]>();
  items$ = this.itemSource.asObservable();

  constructor(private _reportService: ReportsService, private _translate: TranslateService) {

  }

  ngOnInit(): void {
    this._reportService.getItemStock().subscribe(
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
