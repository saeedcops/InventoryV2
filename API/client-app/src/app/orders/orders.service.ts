import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICustomer } from '../shared/models/customer';
import { IEngineer } from '../shared/models/engineer';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getEngineers() {


    return this.http.get<IEngineer[]>(this.baseUrl + 'Engineers');
  }

  getCustomers() {


    return this.http.get<ICustomer[]>(this.baseUrl + 'Customers');
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
