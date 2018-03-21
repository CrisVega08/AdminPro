import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UploadModalService {

  public type: string;
  public id: string;
  public hidden: string = 'hidden';

  public notification = new EventEmitter<any>();

  constructor() {
    console.log('Servicio');
  }

  hiddenModal() {
    this.hidden = 'hidden';
    this.type = null;
    this.id = null;
  }

  showModal(type: string, id: string) {
    this.type = type;
    this.id = id;
    this.hidden = '';
  }
}
