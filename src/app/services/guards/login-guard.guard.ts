import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../uses/user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor( public _userSer: UserService) {  }

  canActivate() {
    if ( this._userSer.isLogin() ) {
      console.log('Paso por el guard');
      return true;
    } else {
      console.log('Bloqueado por el guard');
      return false;
    }
  }
}
