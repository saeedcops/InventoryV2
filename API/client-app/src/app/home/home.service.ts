import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDashboardItem, IItemPagination } from '../shared/models/item';
import { IPartNumber } from '../shared/models/order';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBorrowParts() {

    return this.http.get<number>(this.baseUrl + 'Parts/Borrowed');
  }


  getBorrowItems() {

    return this.http.get<number>(this.baseUrl + 'Items/Borrowed');
  }
  getSoldParts() {

    return this.http.get<IPartNumber[]>(this.baseUrl + 'Parts/Sold');
  }


  getSoldItems() {

    return this.http.get<IPartNumber[]>(this.baseUrl + 'Items/Sold');
  }

  getParts() {

    return this.http.get<IPartNumber[]>(this.baseUrl + 'Parts/PartNumbers');
  }


  getItems() {

    return this.http.get<IPartNumber[]>(this.baseUrl + 'Items/PartNumbers');
  }

}
