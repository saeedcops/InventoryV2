import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { IItem } from '../../shared/models/item';
import { ReportsService } from '../reports.service';
@Component({
  selector: 'app-item-stocktaking',
  templateUrl: './item-stocktaking.component.html',
  styleUrls: ['./item-stocktaking.component.scss']
})
export class ItemStocktakingComponent implements OnInit {
  private itemSource = new ReplaySubject<IItem[]>();
  items$ = this.itemSource.asObservable();

  constructor(private _reportService: ReportsService) {

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
