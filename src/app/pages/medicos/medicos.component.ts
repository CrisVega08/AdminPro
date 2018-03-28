import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../services/hospital/hospitales.service';
import { Medico } from '../../models/medico.model';
import { UserService } from '../../services/service.index';

import swal from 'sweetalert2';
import { UploadModalService } from '../../custom-components/upload-modal/upload-modal.service';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: []
})
export class MedicosComponent implements OnInit {
  Medicos: Medico[] = [];
  loading: Boolean = false;
  totalMedicos: number;
  constructor(
    public _genSer: HospitalesService,
    public _usrSer: UserService,
    public _molUpl: UploadModalService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.loading = false;
    this._genSer.cargar('medico', this._usrSer.token)
        .subscribe((res: any) => {
          this.Medicos = res.medicos;
          this.totalMedicos = res.total;
          this.loading = true;
        });
  }
  search(term: string) {
    if (term.length <= 0) {
      this.cargarMedicos();
      return;
    }
    // this.loading = true;
    let ext = 'busqueda/coleccion/medicos';
    this._genSer.buscar(term, ext)
        .subscribe(( res: any) => {
          this.Medicos = res.medicos;
          // this.loading = false;
        });
  }

  crear() {
    swal({
      title: 'Crear un hospital',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'No, cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      this._genSer.crear(result.value, 'hospital', this._usrSer.token)
                  .subscribe((res) => {
                    this.cargarMedicos();
                    if (res) {
                      swal({
                        type: 'success',
                        title: 'Cración exitosa',
                        html: 'Se ha creado el hospital: ' + result.value
                      });
                    }
                  });
    });
  }

  eliminar(medico: Medico) {
    swal({
      title: '¿Estas seguro?',
      text: ` Desea eliminar ${medico.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this._genSer.borrar(medico._id, 'medico', this._usrSer.token)
                .subscribe ( (res: any) => {
                  this.cargarMedicos();
                });
      }
    });
  }

  actualizar(medico: Medico) {
    this._genSer.actualizar(medico._id, medico, 'medico', this._usrSer.token)
                .subscribe(( res: any ) => {
                  if (res) {
                    swal({
                      type: 'success',
                      title: 'Actualización exitosa',
                      html: 'Se ha actualizado :' + res.medico.nombre
                    });
                  }
                  this.cargarMedicos();
                });
  }

  showMdl(id: string) {
    this._molUpl.showModal('medicos', id);
  }
}
