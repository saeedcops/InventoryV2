import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser, IUserRole } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  user!: IUser;
  private userSource = new ReplaySubject<IUser>(1);

  user$ = this.userSource.asObservable();

  private role = new ReplaySubject<string[]>();
  role$ = this.role.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getRoles() {
    return this.http.get<string[]>(this.baseUrl + 'Accounts/Roles').subscribe(res => {
      this.role.next(res);
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  getUsersWithRoles() {
    return this.http.get<IUserRole>(this.baseUrl + 'Accounts/UsersRole');
  }
  athorizeUser(data: any) {
    return this.http.post(this.baseUrl + 'Accounts/Authorize', data);
  }

  revokeUser(data: any) {
    return this.http.post(this.baseUrl + 'Accounts/Revoke', data);
  }

  register(values: any) {

    return this.http.post(this.baseUrl + 'Accounts/Register', values);
  }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.userSource.next(this.user);
      return of();
    }
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + 'account', { headers: header }).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.userSource.next(user);
        }
      })
    );
  }

  login(values: any) {

    return this.http.post(this.baseUrl + 'accounts/login', values)
      .pipe(
        map((user: any) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.userSource.next(user);
          }
        })
      );
  }



  logout() {
    localStorage.removeItem('token');
    this.userSource.next(this.user);

    this.router.navigateByUrl('/');
  }

}
