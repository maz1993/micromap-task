import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-its-graph',
  templateUrl: './its-graph.component.html',
  styleUrls: ['./its-graph.component.scss'],
})
export class ItsGraphComponent implements OnInit, OnChanges, OnDestroy {
  @Input() props!: any;
  graphData: any;

  rowBarLabel: Array<any>;
  rowData1: Array<any>;
  rowData2: Array<any>;
  rowData3: Array<any>;
  rowData4: Array<any>;
  rowData5: Array<any>;
  rowData6: Array<any>;

  chart: any = null;

  constructor() {
    this.rowBarLabel = [];
    this.rowData1 = [];
    this.rowData2 = [];
    this.rowData3 = [];
    this.rowData4 = [];
    this.rowData5 = [];
    this.rowData6 = [];
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('data from statistics comp loineee', this.props);
    if (this.props) {
      const dataArray1 =
        this.props[
          'Existing Features Updated from 4 July 2022 Untill 26 September 2023'
        ];
      const dataArray2 =
        this.props[
          'New Features created from 4 July 2022 Untill 26 September 2023'
        ];
      const dataArray3 = this.props['Total Feature Count Untill 3 July 2022'];
      const dataArray4 = this.props['Total Feature Count Untill 30 June 2023'];
      const dataArray5 =
        this.props['Total Feature Count Untill 30 September 2023'];
      const dataArray6 = this.props['Total Feature Count Untill 31 March 2023'];
      const label = this.props.sections;

      for (let i = 0; i < dataArray1.length; i++) {
        if (
          dataArray1[i] > 0 ||
          dataArray2[i] > 0 ||
          dataArray3[i] > 0 ||
          dataArray4[i] > 0 ||
          dataArray5[i] > 0 ||
          dataArray6[i] > 0
        ) {
          this.rowData1.push(dataArray1[i]);
          this.rowData2.push(dataArray2[i]);
          this.rowData3.push(dataArray3[i]);
          this.rowData4.push(dataArray4[i]);
          this.rowData5.push(dataArray5[i]);
          this.rowData6.push(dataArray6[i]);
          this.rowBarLabel.push(label[i].name);
        }
      }

      this.creatLineChart();
    }
  }

  creatLineChart() {
    const data = {
      labels: this.rowBarLabel,
      datasets: [
        {
          label: 'Updated Untill 3 July 2022',
          data: this.rowData1,
          pointBackgroundColor: ['#FCDA8C'],
          borderColor: '#FCDA8C',
          pointRadius: 4,
          tension: 0.5,
          hoverBorderColor: '#FCDA8C',
          fill: true,
        },
        {
          label: 'Created Untill 31 March 2023',
          data: this.rowData2,
          pointBackgroundColor: ['#F5B391'],
          borderColor: '#F5B391', 
          pointRadius: 4,
          tension: 0.2,
          hoverBorderColor: '#F5B391',
          fill: true,
        },
        {
          label: 'Untill 3 July 2022',
          data: this.rowData3,
          pointBackgroundColor: ['#DD9AA9'],
          borderColor: '#DD9AA9',
          pointRadius: 4,
          tension: 0.5,
          hoverBorderColor: '#DD9AA9',
          fill: true,
        },
        {
          label: 'Untill 30 June 2023',
          data: this.rowData4,
          pointBackgroundColor: ['#BB8DB5'],
          borderColor: '#BB8DB5',
          pointRadius: 4,
          tension: 0.2,
          hoverBorderColor: '#BB8DB5',
          fill: true,
        },
        {
          label: 'Untill 30 September 2023',
          data: this.rowData5,
          pointBackgroundColor: ['#9884AE'],
          borderColor: '#9884AE',
          pointRadius: 4,
          tension: 0.5,
          hoverBorderColor: '#9884AE',
          fill: true,
        },
        {
          label: 'Untill 31 March 2023',
          data: this.rowData6,
          pointBackgroundColor: ['#7F7F81'],
          borderColor: '#7F7F81',
          pointRadius: 4,
          tension: 0.2,
          hoverBorderColor: '#7F7F81',
          fill: true,
        },
      ],
    };

    // config block
    const config: any = {
      type: 'line',
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
              if (tooltipItem.tooltipItems[0]) {
                return tooltipItem.tooltipItems[0].dataset.pointBackgroundColor;
              }
            },
          },
          title: {
            text: 'TRA ITS (Features)',
            display: true,
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
            ticks: {
              font: {
                size: 7,
                family: 'Manrope',
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
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

    this.chart = new Chart('MyChart1', config);
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
