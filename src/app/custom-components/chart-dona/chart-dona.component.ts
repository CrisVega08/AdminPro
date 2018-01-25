import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-chart-dona',
  templateUrl: './chart-dona.component.html',
  styles: []
})
export class ChartDonaComponent implements OnInit {
  // Doughnut
  @Input() ChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() ChartData: number[] = [350, 450, 100];
  @Input() ChartType: string = 'doughnut';
  @Input() ChartTitle: string = 'Chart';

  constructor() { }

  ngOnInit() {
  }

}
