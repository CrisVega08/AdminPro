import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../services/hospital/hospitales.service';
import { Hospital } from '../../models/hospital.model';
import { UserService } from '../../services/uses/user.service';
import swal from 'sweetalert2';
import { UploadModalService } from '../../custom-components/upload-modal/upload-modal.service';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  Hospitales: Hospital[] = [];
  totalHospitales: number;
  loading: Boolean = false;
  constructor(
    public _genSer: HospitalesService,
    public _usrSer: UserService,
    public _molUpl: UploadModalService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.loading = false;
    this._genSer.cargar('hospital', this._usrSer.token)
        .subscribe((hosp: any) => {
          this.Hospitales = hosp.hospitales;
          this.totalHospitales = hosp.total;
          this.loading = true;
        });
  }
  search(term: string) {
    if (term.length <= 0) {
      this.cargarHospitales();
      return;
    }
    // this.loading = true;
    let ext = 'busqueda/coleccion/hospitales';
    this._genSer.buscar(term, ext)
        .subscribe(( hosp: any) => {
          this.Hospitales = hosp.hospitales;
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
      let nombre = {
        nombre: result.value
      };
      this._genSer.crear(nombre, 'hospital', this._usrSer.token)
                  .subscribe((res) => {
                    this.cargarHospitales();
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

  eliminar(hospital: Hospital) {
    swal({
      title: '¿Estas seguro?',
      text: ` Desea eliminar ${hospital.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this._genSer.borrar(hospital._id, 'hospital', this._usrSer.token)
                .subscribe ( (res: any) => {
                  this.cargarHospitales();
                });
      }
    });
  }

  actualizar(hospital: Hospital) {
    this._genSer.actualizar(hospital._id, hospital, 'hospital', this._usrSer.token)
                .subscribe(( res: any ) => {
                  if (res) {
                    swal({
                      type: 'success',
                      title: 'Actualización exitosa',
                      html: 'Se ha actualizado :' + res.hospital.nombre
                    });
                  }
                  this.cargarHospitales();
                });
  }

  showMdl(id: string) {
    this._molUpl.showModal('hospitales', id);
  }
}
