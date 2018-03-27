import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { User } from '../../models/user.model';
import { UploadFileService } from '../../services/service.index';
import { UploadModalService } from './upload-modal.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styles: []
})
export class UploadModalComponent implements OnInit {
  user: User;
  uploadFile: File;
  ImageTemp: string;

  constructor(
    public _uplSer: UploadFileService,
    public _modUpl: UploadModalService
  ) { }

  ngOnInit() {
  }

  selecImage(file: File ) {

    if ( !file ) {
      this.uploadFile = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Only images', 'This file do not are a file', 'error' );
      this.uploadFile = null;
      return;
    }

    this.uploadFile = file;

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.ImageTemp = reader.result;
    };

  }

  closeModal() {
    this.ImageTemp = null;
    this.uploadFile = null;
    this._modUpl.hiddenModal();
  }

  uploadFl() {
    this._uplSer.uploadFile(this.uploadFile, this._modUpl.type, this._modUpl.id)
    .then((resp) => {
      this._modUpl.notification.emit(resp);
      this.closeModal();
    }).catch((e) => {
      console.log('Error en la carga...');
    });
  }
}
