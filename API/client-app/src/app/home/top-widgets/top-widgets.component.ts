import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ItemService } from '../../items/item.service';
import { IDashboardItem } from '../../shared/models/item';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.scss']
})

export class TopWidgetsComponent implements OnInit {

  dashboard$!: Observable<IDashboardItem>;

  constructor(private _homeService: HomeService) { }
    ngOnInit(): void {
      this._homeService.getItemsdashboard();
      this.dashboard$ = this._homeService.dashboard$;
    }
}
