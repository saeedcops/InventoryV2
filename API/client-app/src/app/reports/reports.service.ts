import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IItem } from '../shared/models/item';
import { IPart } from '../shared/models/part';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }


  getItemActions(data:any) {

    return this.http.get<IItem[]>(this.baseUrl + 'Reports/ItemAction?From=' + data.from + '&To=' + data.to + '&PartNumber=' +data.partNumber);
  }

  getPartActions(data: any) {

    return this.http.get<IPart[]>(this.baseUrl + 'Reports/PartAction?From='+data.from+'&To='+data.to+'&PartNumber='+data.partNumber);
  }

  getItemStock() {

    return this.http.get<IItem[]>(this.baseUrl + 'Reports/ItemStocktaking');
  }

  getPartStock() {

    return this.http.get<IPart[]>(this.baseUrl + 'Reports/PartStocktaking');
  }
}
