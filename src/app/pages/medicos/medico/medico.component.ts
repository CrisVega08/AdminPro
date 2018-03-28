import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalesService } from '../../../services/hospital/hospitales.service';
import { UserService } from '../../../services/uses/user.service';
import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadModalService } from '../../../custom-components/upload-modal/upload-modal.service';

import swal from 'sweetalert2';
@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','','','');
  hospital: Hospital = new Hospital('');
  constructor(
    public _genSer: HospitalesService,
    public _usrSer: UserService,
    public _router: Router,
    public actRou: ActivatedRoute,
    public _molUpl: UploadModalService
  ) {
    actRou.params.subscribe( params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico (id);
      }
    });
  }

  ngOnInit() {
    this._genSer.cargar('hospital', this._usrSer.token)
        .subscribe((res: any) => {
          this.hospitales = res.hospitales;
        });

    this._molUpl.notification
        .subscribe((res: any) => {
          this.medico.img = res.medico.img;
        });
  }

  guardarmedico(f: NgForm) {
    if ( f.valid ) {
      if ( this.medico._id ) {
        this._genSer.actualizar(this.medico._id, f.value, 'medico', this._usrSer.token)
                  .subscribe((res: any) => {
                    this.medico._id = res.medico._id;
                    swal('Médico actualizado', res.medico.nombre, 'success');
                    this._router.navigate(['/medico', res.medico._id]);
                  });
      } else {
        this._genSer.crear(f.value, 'medico', this._usrSer.token)
                  .subscribe((res: any) => {
                    console.log(res)
                    this.medico._id = res.medico._id;
                    swal('Médico creado', res.medico.nombre, 'success');
                    this._router.navigate(['/medico', res.medico._id]);
                  });
      }
    } else { return; }
  }

  cambioHospital( id: string ) {
    this._genSer.obtener(id, 'hospital', this._usrSer.token)
                .subscribe((res: any) => this.hospital = res.hospital);
  }

  cargarMedico(id: string) {
    this._genSer.obtener(id, 'medico', this._usrSer.token)
                .subscribe((res: any) => {
                  this.medico = res.medico;
                  this.medico.hospital = res.medico.hospital._id;
                  this.cambioHospital(this.medico.hospital);
                });
  }

  cambiarImagen() {
    this._molUpl.showModal('medicos', this.medico._id);
  }
}
