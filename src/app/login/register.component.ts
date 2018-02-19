import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import * as swal from 'sweetalert2';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';


declare function initPlugin();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(
    public _userSer: UserService,
    public _router: Router
  ) { }

  ngOnInit() {
    initPlugin();

    this.form = new FormGroup({
      name : new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl( false )
    }, { validators: this.beEquals('password', 'password2')});

    this.form.setValue({
      name: 'test',
      email: 'test@test.com',
      password: '123',
      password2: '1234',
      conditions: false
    });
  }

  registerUser() {
    // console.log(this.form.value);
    // console.log('Valid', this.form.valid);
    if (!this.form.valid) {
      return;
    }

    if (!this.form.value.conditions) {
      swal(
        'Important!',
        'You have to accept conditions!',
        'warning'
      );
      return;
    }

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this._userSer.createUser(user).subscribe( res => {
      swal(
        'User created',
        user.email,
        'success'
      );
      this._router.navigate(['/login']);
    });
  }

  beEquals( field1 , field2) {
    return (group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if ( pass1 === pass2) {return null; }
      return{
        beEquals: true
      };
    };
  }
}
