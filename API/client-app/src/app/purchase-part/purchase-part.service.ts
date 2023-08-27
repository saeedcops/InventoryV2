import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPurchasePart } from '../shared/models/purchase';
@Injectable({
  providedIn: 'root'
})
export class PurchasePartService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  getIParts() {

    return this.http.get<IPurchasePart[]>(this.baseUrl + 'Purchaseparts');
  }

  getIPartById(id:string) {

    return this.http.get<IPurchasePart>(this.baseUrl + 'PurchaseParts/'+id);
  }

  addParts(data: any) {
    

    return this.http.post(this.baseUrl + 'Purchaseparts',data);
  }

  updatePart(data: any) {
    return this.http.post(this.baseUrl + 'Purchaseparts/update', data);
  }

  deletePart(data: any) {


    return this.http.post(this.baseUrl + 'Purchaseparts/delete', data);
  }
}
