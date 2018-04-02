import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @Input() cols: string[] = ['col one', 'col two' , 'col three', 'col four' , 'col five'];
  @Input() total: number = 0;
  @Input() titleTable: string = 'Title';
  @Input() until: number = 0;
  @Input() rows: any[] = [];
  @Input() propertiesRow: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
