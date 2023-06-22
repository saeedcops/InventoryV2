import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, take, pairwise } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  returnUrl!: string;
  errors!: string[];
  loginForm!: FormGroup;
  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });

  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(() => {


      window.location.href = this.returnUrl;

     // this.router.navigateByUrl(this.returnUrl);

      //this.router.events
      //  .pipe(take(1), filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      //  .subscribe((events: RoutesRecognized[]) => {

      //    console.log('previous url', events[0].urlAfterRedirects);
      //    console.log('current url', events[1].urlAfterRedirects);

      //    this.returnUrl = events[0].urlAfterRedirects;

      //    if (!this.returnUrl) {
      //      console.log("navigate /" );
      //      this.router.navigate(['/']);
      //    } else {
      //      console.log("navigate" + this.returnUrl);
      //     this.router.navigateByUrl(this.returnUrl);
      //    }
      //  }, err => { console.log(err); });

    }, er => {
      this.errors = er.errors;
      console.log(er);

    });
  }
}
