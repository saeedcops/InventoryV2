import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IBrand } from '../shared/models/brand';
import { IItem, IItemDetail, IItemType } from '../shared/models/item';
import { IPart } from '../shared/models/part';
import { IPurchasePart } from '../shared/models/purchase';
import { IWarehouse } from '../shared/models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  getIPartById(id: string) {

    return this.http.get<IPurchasePart>(this.baseUrl + 'Purchaseparts/' + id);
  }

  getPart(id: number) {

    return this.http.get<IItemDetail>(this.baseUrl + 'Parts/' + id);
  }

  getWarehouses() {

    return this.http.get<IWarehouse[]>(this.baseUrl + 'Warehouses');
  }


  getParts() {

    return this.http.get<IPart[]>(this.baseUrl + 'parts');
  }

  addPart(data: any) {
    

    return this.http.post(this.baseUrl + 'parts',data);
  }

  updatePart(data: any) {
    return this.http.post(this.baseUrl + 'parts/update', data);
  }
}
