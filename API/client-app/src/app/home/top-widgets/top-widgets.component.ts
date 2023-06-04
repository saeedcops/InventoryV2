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

  parts =0;
  items = 0;

  soldItems = 0;

  borrowItems = 0;

  constructor(private _homeService: HomeService) { }
    ngOnInit(): void {

      this._homeService.getItems().subscribe(res => {
        res.forEach(c => this.items += c.qty);
        console.log(this.items);

      }, err => { console.log(err); });

      this._homeService.getParts().subscribe(res => {
        res.forEach(c => this.parts += c.qty);
        console.log(this.parts);

      }, err => { console.log(err); });



      this._homeService.getSoldItems().subscribe(res => {
        res.forEach(c => this.soldItems += c.qty);
        console.log(this.items);

      }, err => { console.log(err); });

      this._homeService.getSoldParts().subscribe(res => {
        res.forEach(c => this.soldItems += c.qty);
        console.log(this.parts);

      }, err => { console.log(err); });

      this._homeService.getBorrowItems().subscribe(res => {
        this.borrowItems += res;
        console.log(this.items);

      }, err => { console.log(err); });

      this._homeService.getBorrowParts().subscribe(res => {
        this.borrowItems += res;
        console.log(this.parts);

      }, err => { console.log(err); });
    }



}
