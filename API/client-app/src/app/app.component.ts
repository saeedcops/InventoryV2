import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ItemsComponent } from './items/items.component';
import { AccountService } from './account/account.service';
import { ReplaySubject } from 'rxjs';
import { IUser } from './shared/models/user';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  private userSource = new ReplaySubject<IUser>();
  lang = localStorage.getItem('lang') ?? "ar";
  role = localStorage.getItem('role') ?? "";
  user$ = this.userSource.asObservable();

  constructor(private translateService: TranslateService,private _accountService: AccountService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {

    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = this.lang === "ar" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);
    const token = localStorage.getItem('token');
    this._accountService.loadCurrentUser(token!);
    this.user$ = this._accountService.user$;
   
  }

  changeLangage() {
    this.lang = this.lang === "ar" ? "en" : "ar";

    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = this.lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem('lang',this.lang);
    this.translateService.setDefaultLang(this.lang);
    window.location.reload();
    this.translateService.use(this.lang);
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
