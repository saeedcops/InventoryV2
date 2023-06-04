import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICustomer } from '../shared/models/customer';
import { IEngineer } from '../shared/models/engineer';
import { IItem } from '../shared/models/item';
import { IOrder, IOrderDetail, IPartNumber } from '../shared/models/order';
import { IPart } from '../shared/models/part';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }


  getParts() {

    return this.http.get<IPartNumber[]>(this.baseUrl + 'Parts/PartNumbers');
  }


  getItems() {

    return this.http.get<IPartNumber[]>(this.baseUrl + 'Items/PartNumbers');
  }

  getEngineers() {


    return this.http.get<IEngineer[]>(this.baseUrl + 'Engineers');
  }

  getCustomers() {


    return this.http.get<ICustomer[]>(this.baseUrl + 'Customers');
  }

  getOrderById(id:number) {

    return this.http.get<IOrderDetail>(this.baseUrl + 'Orders/'+id);
  }
  getOrders() {


    return this.http.get<IOrder[]>(this.baseUrl + 'Orders');
  }

  returnOrder(data: any) {


    return this.http.post(this.baseUrl + 'Orders/Return', data);
  }
  addOrder(data: any) {
    

    return this.http.post(this.baseUrl + 'Orders',data);
  }
}
