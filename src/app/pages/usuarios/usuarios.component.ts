import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/uses/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: User[] = [];
  desde: number = 0;
  totalRegister: number =0;

  constructor(
    public _userSer: UserService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this._userSer.loadingUser(this.desde)
      .subscribe( (res: any) => {
        this.totalRegister = res.total;
        this.usuarios = res.usuarios;
      });
  }

  changeUntil(num: number) {
    let until = this.desde + num;
    console.log(until);
    if ( until >= this.totalRegister ) {
      return;
    }

    if ( until < 0 ) {
      return;
    }

    this.desde += num;
    this.cargarUsuarios();
  }
}
