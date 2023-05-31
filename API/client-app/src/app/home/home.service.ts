import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDashboardItem, IItemPagination } from '../shared/models/item';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = environment.apiUrl;
  //dashboard!: IDashboardItem;
  private dash = new ReplaySubject<IDashboardItem>(1);

  dashboard$ = this.dash.asObservable();

  constructor(private http: HttpClient) { }


  getItemsdashboard() {
    
    return this.http.get<IDashboardItem>(this.baseUrl + 'items/dashboard')
      .subscribe(res => {

        this.dash.next(res);
        console.log(res);

    }, err => {
        console.log(err);
    });
  }

}
