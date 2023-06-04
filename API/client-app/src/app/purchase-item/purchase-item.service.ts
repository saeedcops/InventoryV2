import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IBrand } from '../shared/models/brand';
import { IPurchaseItem, IPurchasePart } from '../shared/models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseItemService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }


  getBrands() {

    return this.http.get<IBrand[]>(this.baseUrl + 'Brands');
  }

  getItemParts() {

    return this.http.get<IPurchasePart[]>(this.baseUrl + 'PurchaseParts');
  }

  getItemById(id:string) {

    return this.http.get<IPurchaseItem>(this.baseUrl + 'PurchaseItems/'+id);
  }

  getItems() {

    return this.http.get<IPurchaseItem[]>(this.baseUrl + 'PurchaseItems');
  }

  addItems(data: any) {
    

    return this.http.post(this.baseUrl + 'PurchaseItems',data);
  }

  updateItem(data: any) {
    return this.http.post(this.baseUrl + 'PurchaseItems/update', data);
  }
}
