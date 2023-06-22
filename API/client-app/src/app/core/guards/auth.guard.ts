import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.accountService.loadCurrentUser(localStorage.getItem('token')!);
    return this.accountService.user$.pipe(
      map(auth => {
        if (auth) {
          return true;
        }
        console.log(state.url);
        return this.router.createUrlTree(['account/login'], { queryParams: { returnUrl: state.url } });
        //this.router.createUrlTree(['account/login'], { queryParams: { returnUrl: state.url } });
        // return false;

      })
    );
  }

}
