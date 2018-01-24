import { ViewChild, Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [],
  providers: [FormsModule]
})
export class IncrementComponent implements OnInit {

  @Input() legend: string = 'Leyenda';
  @Input() porcentage: number = 50;

  @Output() porcentageChange: EventEmitter<number> = new EventEmitter;

  @ViewChild('txtPorcentage') txtPorcentage: ElementRef;
  constructor() {
   }

  ngOnInit() {
  }

  changeValue(value) {
    this.porcentage = this.porcentage + value;
    if ( this.porcentage > 100 ) {
      this.porcentage = 100;
    } else if ( this.porcentage < 0 ) {
      this.porcentage = 0;
    }
    this.porcentageChange.emit( this.porcentage );
    this.txtPorcentage.nativeElement.focus();
  }

  onChanges( newValue: number) {

    // let elemHTML = document.getElementsByName('porcentage')[0];
    //console.log(elemHTML.value);
    if ( newValue > 100 ) {
      newValue = 100;
    } else if (newValue <= 0) {
      newValue = 0;
    }
    this.porcentage = newValue;

    // elemHTML.value = Number( this.porcentage );
    this.txtPorcentage.nativeElement.value = this.porcentage;
    this.porcentageChange.emit( this.porcentage );
  }
}
