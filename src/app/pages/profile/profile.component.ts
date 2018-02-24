import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  uploadFile: File;
  ImageTemp: File;

  constructor(public _userSer: UserService) {
    this.user = _userSer.user;
    console.log(this.user);
  }

  ngOnInit() {
  }

  save(user: any) {
    this.user.name = user.nombre;
    if ( !this.user.google ) {
      this.user.password = user.password;
    }
    this.user.email = user.email;

    this._userSer.updateUser(user)
        .subscribe( res => {

          console.log(res);
        });
  }

  selecImage( file: File ) {

    if ( !file ) {
      this.uploadFile = null;
      return;
    }

    this.uploadFile = file;
  }

  changeImage() {
    this._userSer.changeImage(this.uploadFile, this.user._id);
  }
}
