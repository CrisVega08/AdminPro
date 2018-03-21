import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styles: []
})
export class UploadModalComponent implements OnInit {
  hidden: string = '';
  constructor() { }

  ngOnInit() {
  }

}
