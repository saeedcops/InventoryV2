import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ItemsComponent } from './items/items.component';
import { AccountService } from './account/account.service';
import { ReplaySubject } from 'rxjs';
import { IUser } from './shared/models/user';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  private userSource = new ReplaySubject<IUser>();

  user$ = this.userSource.asObservable();

  constructor(private _accountService: AccountService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this._accountService.loadCurrentUser(token!);
    this.user$ = this._accountService.user$;
   
  }

  changeLangage(lang: string) {
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    //SwitchAppLanguage('en')
    //this.translateService.setDefaultLang(lang);
    //this.translateService.use(lang);
    //this.changeCssFile(lang);
  }

  logout() {
    this._accountService.logout();
  }
  ngAfterViewInit() {
    //setTimeout(() => {
    //this.observer.observe(["(max-width: 800px)"]).subscribe((res: { matches: any; }) => {
    //  if (res.matches) {
    //   // this.sidenav.mode = "over";
    //    this.sidenav.close();
    //  } else {
    //    this.sidenav.mode = "side";
    //    this.sidenav.open();
    //  }
    //});
    //});
  }

}
