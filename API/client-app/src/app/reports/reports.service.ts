import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBrand } from '../shared/models/brand';
import { IItem, IItemDetail, IItemType } from '../shared/models/item';
import { IPart } from '../shared/models/part';
import { IPurchaseItem, IPurchaseItemAdd } from '../shared/models/purchase';
import { IUser } from '../shared/models/user';
import { IWarehouse } from '../shared/models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }


  getItemActions(data:any) {

    return this.http.get<IItem[]>(this.baseUrl + 'Reports/ItemAction?From' + data.from + '&To=' + data.to + '&PartNumber=' +data.partNumber);
  }

  getPartActions(from:string,to:string,partNumber:string) {

    return this.http.get<IPart[]>(this.baseUrl + 'Reports/PartAction?From='+from+'&To='+to+'&PartNumber='+partNumber);
  }

}
