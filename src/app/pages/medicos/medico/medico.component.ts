import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalesService } from '../../../services/hospital/hospitales.service';
import { UserService } from '../../../services/uses/user.service';
import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';

import swal from 'sweetalert2';
@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();

  constructor(
    public _genSer: HospitalesService,
    public _usrSer: UserService
  ) { }

  ngOnInit() {
    this._genSer.cargar('hospital', this._usrSer.token)
        .subscribe((res: any) => {
          this.hospitales = res.hospitales;
        });
  }

  guardarmedico(f: NgForm) {
    if ( f.valid ) {
      this._genSer.crear(f.value, 'medico', this._usrSer.token)
                .subscribe((res: any) => {
                  swal('Médico creado', res.nombre, 'success');
                });
    } else { return; }
  }
}
