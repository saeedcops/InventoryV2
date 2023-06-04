import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBrand } from '../shared/models/brand';
import { IItem, IItemDetail, IItemType } from '../shared/models/item';
import { IPurchaseItem, IPurchaseItemAdd } from '../shared/models/purchase';
import { IUser } from '../shared/models/user';
import { IWarehouse } from '../shared/models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }


  getItemById(id: string) {

    return this.http.get<IPurchaseItemAdd>(this.baseUrl + 'Purchaseitems/' + id);
  }

  getItem(id:number) {

    return this.http.get<IItemDetail>(this.baseUrl + 'Items/'+id);
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
