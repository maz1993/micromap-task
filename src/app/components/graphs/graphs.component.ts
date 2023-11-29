import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit, OnChanges {

  @Input() totalProps!: any
  graphLabel: Array<any>
  graphData: Array<any>
  chart: any = null;

  constructor(){
    this.graphLabel = []
    this.graphData = [] 
  }

  ngOnInit(): void {}


  ngOnChanges(changes: SimpleChanges): void
  {
    if(this.totalProps)
    {
      for (const [key, value] of Object.entries(this.totalProps)) {
        
        this.graphLabel.push(key);
        this.graphData.push(value);
      }
      console.log('data', this.graphLabel)
      this.chartInIt()
    }
  }


  chartInIt() {
    const data = {
      labels: this.graphLabel,
      datasets: [{
        label: 'My First Dataset',
        data: this.graphData,
        backgroundColor: [
          '#DD9AA9',
          '#7F7F81',
          '#BB8DB5',
          '#9884AE',
          '#F5B391',
          '#FCDA8C',
        ],
        hoverOffset: 13,
        borderColor: '#fff',
        hoverBorderColor: '#fff',
        hoverBackgroundColor : [
          '#DD9AA9',
          '#7F7F81',
          '#BB8DB5',
          '#9884AE',
          '#F5B391',
          '#FCDA8C',
        ],
        borderJoinStyle: 'bevel',
        
      }]
    };

    const config: any = {
      type: 'polarArea',
      data,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            yAlign: 'bottom',
            displayColors: false,
            backgroundColor: (tooltipItem: any) => {
              if (tooltipItem) {
                return tooltipItem.tooltip.labelColors[0].backgroundColor;
              }
            },
          },
          title: {
            text: 'Total Features Count',
            display: true,
            align: 'start',
            color: '#595959',
            font: {
              size: 13,
              family: 'Manrope',
            },
          },
        },
      },
      plugins: [ ],
    };


    if (this.chart != null) {
      this.chart.destroy();
    }

    this.chart = new Chart('MyChart6', config);
  }

  ngOnDestroy(): void {
    this.chart.destroy();

  }
}
