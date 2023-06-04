import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IBrand } from '../shared/models/brand';
import { IPurchaseItem, IPurchaseOrder, IPurchasePart } from '../shared/models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  getParts() {

    return this.http.get<IPurchasePart[]>(this.baseUrl + 'PurchaseParts');
  }


  getItems() {

    return this.http.get<IPurchaseItem[]>(this.baseUrl + 'PurchaseItems');
  }

  getPurchaseById(id:string) {

    return this.http.get<IPurchaseOrder>(this.baseUrl + 'PurchaseOrders/'+id);
  }

  getPurchase() {

    return this.http.get<IPurchaseOrder[]>(this.baseUrl + 'PurchaseOrders');
  }

  addPurchase(data: any) {
    

    return this.http.post(this.baseUrl + 'PurchaseOrders',data);
  }

  updatePurchase(data: any) {
    return this.http.post(this.baseUrl + 'PurchaseOrders/update', data);
  }
}
