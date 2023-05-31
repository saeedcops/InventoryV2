import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBrand } from '../shared/models/brand';
import { IItem, IItemType } from '../shared/models/item';
import { IUser } from '../shared/models/user';
import { IWarehouse } from '../shared/models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  getItemTypes() {

    return this.http.get<IItemType[]>(this.baseUrl + 'ItemTypes');
  }

  getBrands() {

    return this.http.get<IBrand[]>(this.baseUrl + 'Brands');
  }

  getWarehouses() {

    return this.http.get<IWarehouse[]>(this.baseUrl + 'Warehouses');
  }


  getItems() {

    return this.http.get<IItem[]>(this.baseUrl + 'items');
  }

  addItems(data: any) {
    

    return this.http.post(this.baseUrl + 'items',data);
  }

  updateItem(data: any) {
    return this.http.post(this.baseUrl + 'items/update', data);
  }
}
