import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ItemsComponent } from './items/items.component';
import { AccountService } from './account/account.service';
import { ReplaySubject } from 'rxjs';
import { IUser } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  private userSource = new ReplaySubject<IUser>(1);

  user$ = this.userSource.asObservable();

  constructor(private observer: BreakpointObserver, private _accountService: AccountService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this._accountService.loadCurrentUser(token!).subscribe(() => {
      console.log("Loaded");
      this.user$ = this._accountService.user$;
    },
      er => { console.log(er); });
    }

  
  ngAfterViewInit() {
    setTimeout(() => {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res: { matches: any; }) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
    });
  }
}
