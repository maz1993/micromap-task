import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit, OnChanges {

  @Input() graphLabel: Array<any>;
  @Input() graphData: Array<any>;
  chart: any = null;

  constructor() {
    this.graphLabel = [];
    this.graphData = [];
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.graphLabel) {
      // console.log('data123', this.graphLabel);
      // console.log('data456', this.graphData);
      this.chartInIt();
    }
  }

  chartInIt() {
    console.log('albel', this.graphLabel)
    let data: any;
    data = {
      labels: this.graphLabel,
      datasets: [
        {
          label: 'Updated Untill 3 July 2022',
          data: this.graphData,
          backgroundColor: [
            '#16639B',
            '#7A8762',
            '#FF9422',
            '#8D99FD',
            '#D7EAA8',
            '#FD635C',
          ],
          hoverBackgroundColor: [
            '#16639B',
            '#7A8762',
            '#FF9422',
            '#8D99FD',
            '#D7EAA8',
            '#FD635C',
          ],
          barThickness: 30,
          borderWidth: 1,
          borderRadius: 3,
          borderColor: [
            '#16639B',
            '#7A8762',
            '#FF9422',
            '#8D99FD',
            '#D7EAA8',
            '#FD635C',
          ],
          hoverBorderColor: [
            '#16639B',
            '#7A8762',
            '#FF9422',
            '#8D99FD',
            '#D7EAA8',
            '#FD635C',
          ],
        },
      ],
      // };
    };

    const config: any = {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
            position: 'bottom',
            title: {
              display: false,
            },
            labels: {
              usePointStyle: true,
              font: {
                size: 7,
                family: 'Manrope',
              },
            },
          },
          tooltip: {
            yAlign: 'bottom',
            displayColors: false,
            backgroundColor: (tooltipItem: any) => {
              if (tooltipItem.tooltipItems[0]) {
                const dataIndex = tooltipItem.tooltipItems[0].dataIndex;
                const datasetIndex = tooltipItem.tooltipItems[0].datasetIndex;
                const backgroundColors =
                  tooltipItem.chart.data.datasets[datasetIndex].backgroundColor;

                if (backgroundColors && backgroundColors.length > dataIndex) {
                  return backgroundColors[dataIndex];
                }
              }
              return 'rgba(0, 0, 0, 0.7)';
            },

            callbacks: {
              label: (tooltipItem: any): any => {
                let label = tooltipItem.dataset.data[tooltipItem.dataIndex];
                return 'Features' + ': ' + label;
              },
            },
          },
          title: {
            text: 'TRA TRAF (Features)',
            display: false,
            align: 'start',
            color: '#595959',
            font: {
              size: 12,
              family: 'Manrope',
            },
          },
        },
        scales: {
          x: {
            position: 'top',
            ticks: {
              callback: (value: any, index: any, values: any) => {
                return value >= 1000 ? value / 1000 + 'k' : value;
              },
              color: '#0092d6',
              font: {
                size: 8,
                weight: 600,
                family: 'Manrope',
              },
            },

            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              display: false,
              color: 'black',
              font: {
                size: 7,
                family: 'Manrope',
              },
            },
            grid: {
              drawTicks: false,
              display: true,
            },
          },
        },
      },

      plugins: [],
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
