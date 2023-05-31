import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../../account/account.service';
//import { BasketService } from '../../basket/basket.service';
//import { IBasket } from '../../shared/models/basket';
import { IUser } from '../../shared/models/user';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  //basket$!: Observable<IBasket>;
  user$!: Observable<IUser>;
  constructor(/*private basketService: BasketService, private accountService: AccountService*/) { }

  ngOnInit(): void {
   // this.basket$ = this.basketService.basket$;
    //this.user$ = this.accountService.user$;
  }

  logout() {
   // this.accountService.logout();
  }
}
