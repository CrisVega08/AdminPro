import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { element } from 'protractor';

declare function initPlugin();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember_me: boolean = false;
  email: string;
  auth2: any;

  constructor(
    private _router: Router,
    private _userSer: UserService
  ) { }

  ngOnInit() {
    initPlugin();
    this.googleInit();
    this.email = localStorage.getItem('email') || null;
    if ( this.email ) {
      this.remember_me = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '369706433888-ldoki6668b7hcip270b8pcun40e3sqh8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn( element2 ) {
    this.auth2.attachClickHandler ( element2, {}, googleUser => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._userSer.loginWithGoogle(token)
      .subscribe( () => { 
        this._router.navigate(['/dashboard']);
      } );
    });
  }
  enter(form: NgForm) {
    if (form.invalid) {return; }

    let user = new User(
      null,
      form.value.email,
      form.value.password
    );

    this._userSer.login(user, form.value.remember_me)
      .subscribe( () => { this._router.navigate(['/dashboard']);
      });
    // this._router.navigate(['/dashboard']);
  }
}
