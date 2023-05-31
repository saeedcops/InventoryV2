import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IItemPagination } from '../shared/models/item';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }


  getBrands() {

    return this.http.get(this.baseUrl + 'brands');
  }

  addBrands(data: any) {
    

    return this.http.post(this.baseUrl + 'brands',data);
  }

  updateBrands(data: any) {


    return this.http.post(this.baseUrl + 'brands/update', data);
  }
}
