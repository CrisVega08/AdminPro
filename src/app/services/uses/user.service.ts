import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  url = URL_SERVICES;
  user: User;
  token: string;

  constructor(
    public _http: HttpClient,
    public _router: Router
  ) {
    console.log('Se inicio');
    this.loadStoge();
  }

  // =============================================
  createUser( user: User) {
    return this._http.post(this.url + '/usuario', user)
      .map( (res: any) => {
        return res.user;
      });
  }

  updateUser( user: User) {
    let headers = new HttpHeaders({ 'Authorization': this.token });
    let options = ({ headers: headers });
    return this._http.put(this.url + '/usuario/' + this.user._id, user, options)
                .map( (res: any) => {
                  this.saveStorage(res.usuario._id, this.token, res.usuario);
                  // this.user = res.usuario;
                  // swal('User updated', user.name, 'succes');

                  return true;
                });
  }


  // ===============================================
  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  // =====================================================
  login( user: User, remember: boolean = false ) {

    if (remember ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this._http.post(this.url + '/login', user )
      .map((res: any) => {
        this.saveStorage(res.id, res.token, res.usuario);
        return true;
      });
  }
  // ==================================================
logout() {
  this.user = null;
  this.token = null;

  localStorage.removeItem('token');
  localStorage.removeItem('user');

  this._router.navigate(['/login']);
}

  // ===================================================
  loginWithGoogle(token: string) {
    let headers = new HttpHeaders({ 'Authorization': token });
    let options = ({ headers: headers });
      return this._http.post(this.url + '/login/google', { }, options)
        .map( (res: any) => {
          this.saveStorage(res.id, res.token, res.usuario);
          return true;
        });
  }

  // ===================================================

  isLogin() {
    return (this.token.length > 5) ? true : false;
  }

  loadStoge() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.token = JSON.parse(localStorage.getItem('user'));
      console.log("entro");
    } else {
      console.log("token vacio");
      this.token = '';
      this.token = null;
    }

  }
}
