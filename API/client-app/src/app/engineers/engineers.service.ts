import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IEngineer } from '../shared/models/engineer';
import { IItemPagination } from '../shared/models/item';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class EngineersService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }


  getEngineers() {

    return this.http.get<IEngineer[]>(this.baseUrl + 'engineers');
  }

  addEngineers(data: any) {
    

    return this.http.post(this.baseUrl + 'engineers',data);
  }

  updatEengineers(data: any) {


    return this.http.post(this.baseUrl + 'engineers/update', data);
  }

  deleteEngineers(data: any) {


    return this.http.post(this.baseUrl + 'engineers/delete', data);
  }
}
