import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICustomer } from '../shared/models/customer';
import { IItemPagination } from '../shared/models/item';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }


  getcustomers() {

    return this.http.get<ICustomer[]>(this.baseUrl + 'customers');
  }

  addcustomers(data: any) {
    

    return this.http.post(this.baseUrl + 'customers',data);
  }

  updatecustomers(data: any) {


    return this.http.post(this.baseUrl + 'customers/update', data);
  }

  deletecustomers(data: any) {


    return this.http.post(this.baseUrl + 'customers/delete', data);
  }
}
