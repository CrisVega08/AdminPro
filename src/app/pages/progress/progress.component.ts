import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  porcentage1: number = 50;
  porcentage2: number = 80;
  constructor() { }

  ngOnInit() {
  }

  // Actualize( event: number ) {
  //   console.log('Evento', event);
  // }
}
