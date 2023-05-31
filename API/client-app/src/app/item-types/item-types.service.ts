import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ItemTypesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getItems() {

    return this.http.get(this.baseUrl + 'ItemTypes');
  }

  addItems(data: any) {
    

    return this.http.post(this.baseUrl + 'ItemTypes',data);
  }

  updateItems(data: any) {


    return this.http.post(this.baseUrl + 'ItemTypes/Update', data);
  }
}
