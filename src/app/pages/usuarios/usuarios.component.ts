import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/uses/user.service';
import swal from 'sweetalert2';
import { UploadModalService } from '../../custom-components/upload-modal/upload-modal.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  colums: any[] = [
    'Imagen',
    'email',
    'Nombre',
    'Role',
    'Auth'
  ];
  properties: any[] = [
    'img',
    'email',
    'nombre',
    'role',
    'auth'
  ];
  title: string = 'Usuarios Registrados';
  usuarios: User[] = [];
  desde: number = 0;
  totalRegister: number = 0;
  loading: boolean = true;

  constructor(
    public _userSer: UserService,
    public _molUpl: UploadModalService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._molUpl.notification
        .subscribe(res => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.loading = true;
    this._userSer.loadingUser(this.desde)
      .subscribe( (res: any) => {
        this.totalRegister = res.total;
        this.usuarios = res.usuarios;
        this.loading = false;
      });
  }

  changeUntil(num: number) {
    let until = this.desde + num;
    if ( until >= this.totalRegister ) {
      return;
    }

    if ( until < 0 ) {
      return;
    }

    this.desde += num;
    this.cargarUsuarios();
  }

  searchUser(term: string) {
    if (term.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.loading = true;
    this._userSer.searchUser(term)
        .subscribe(( usuarios: User[]) => {
          this.usuarios = usuarios;
          this.loading = false;
        });
  }
  saveRole (usuario: User) {
    this._userSer.updateUser(usuario)
      .subscribe( (res: any ) => {
        console.log(res);
      });
  }


  deleteUser( usuario: any ) {
    if ( usuario._id === this._userSer.user._id) {
      swal('No se puede borrar', 'No se puede borrar su propia cuenta', 'error');
      return;
    }

    swal({
      title: '¿Estas seguro?',
      text: ` Desea eliminar a ${usuario.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this._userSer.deleteUser(usuario._id)
                    .subscribe((resp) => {
                      console.log(resp);
                      this.cargarUsuarios();
                    });
      }
    });
  }
  showMdl( id ) {
    this._molUpl.showModal('usuarios', id);
  }
}
