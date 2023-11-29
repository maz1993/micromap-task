import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-rfm-graph',
  templateUrl: './rfm-graph.component.html',
  styleUrls: ['./rfm-graph.component.scss']
})
export class RfmGraphComponent implements OnInit, OnChanges {

  @Input() props!: any

  graphData:any

  rowBarLabel: Array<any>
  rowData1: Array<any>
  rowData2: Array<any>
  rowData3: Array<any>
  rowData4: Array<any>
  rowData5: Array<any>
  rowData6: Array<any>

  chart: any = null;


  constructor(){
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
    // throw new Error('Method not implemented.');
    console.log('data from statistics comp', this.props)
    if(this.props)
    {
      const dataArray1 = this.props['Existing Features Updated from 4 July 2022 Untill 26 September 2023']
      const dataArray2 = this.props['New Features created from 4 July 2022 Untill 26 September 2023']
      const dataArray3 = this.props['Total Feature Count Untill 3 July 2022']
      const dataArray4 = this.props['Total Feature Count Untill 30 June 2023']
      const dataArray5 = this.props['Total Feature Count Untill 30 September 2023']
      const dataArray6 = this.props['Total Feature Count Untill 31 March 2023'];
      const label = this.props.sections;

      for (let i = 0; i < dataArray1.length; i++) {
        if (dataArray1[i] > 0 || dataArray2[i] > 0 || dataArray3[i] > 0 ||  dataArray4[i] > 0 || dataArray5[i] > 0 || dataArray6[i] > 0) {
          this.rowData1.push(dataArray1[i]);
          this.rowData2.push(dataArray2[i]);
          this.rowData3.push(dataArray3[i]);
          this.rowData4.push(dataArray4[i]);
          this.rowData5.push(dataArray5[i]);
          this.rowData6.push(dataArray6[i]);
          this.rowBarLabel.push(label[i].name);
        }
    }

     this.createChart()
    }
    }



    createChart() {
      let data: any;
      data = {
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
            type: 'line'
          },
          {
            label: 'Created Untill 31 March 2023',
            data: this.rowData2,
            pointBackgroundColor: ['#F5B391'],
            borderColor: '#F5B391', 
            pointRadius: 4,
            tension: 0.2,
            hoverBorderColor: '#F5B391',
            type: 'line'
          },
          {
            label: 'Untill 3 July 2022',
            data: this.rowData3,
            backgroundColor: ['#DD9AA9'],
            hoverBackgroundColor: ['#DD9AA9'],
            categoryPercentage: 0.5,
            barThickness: 8,
            type: 'bar'
          },
          {
            label: 'Untill 30 June 2023',
            data: this.rowData4,
            backgroundColor: ['#BB8DB5'],
            hoverBackgroundColor: ['#BB8DB5'],
            categoryPercentage: 0.5,
            barThickness: 8,
            type: 'bar'
          },
          {
            label: 'Untill 30 September 2023',
            data: this.rowData5,
            backgroundColor: ['#9884AE'],
            hoverBackgroundColor: ['#9884AE'],
            categoryPercentage: 0.5,
            barThickness: 6,
            type: 'bar'
          },
          {
            label: 'Untill 31 March 2023',
          data: this.rowData6,
          pointBackgroundColor: ['#7F7F81'],
          borderColor: '#7F7F81',
          pointRadius: 4,
          tension: 0.2,
          hoverBorderColor: '#7F7F81',
            type: 'line'
          },
          
        ],
      // };
    }
  
      const config: any = {
        // type: 'bar', 
        data,
        options: {
          // aspectRatio:2.5,
          indexAxis: 'x',
          maintainAspectRatio: false,
  
          plugins: {
            legend: {
              display: false,
              position: 'bottom',
              title: {
                display: false,
                // text: 'Current Week',
                // position: 'start',
              },
              labels: {
                usePointStyle: true,
                // padding: 300,
                // color: 'red',
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
                  console.log(tooltipItem.tooltipItems[0])
                  return tooltipItem.tooltipItems[0].dataset.backgroundColor;
                }
              },
              callbacks: {
                label: (tooltipItem: any): any => {
                  let labelKey = tooltipItem.dataset.label
                  let label = tooltipItem.dataset.data[tooltipItem.dataIndex];
                  return labelKey + ': ' + label;
                },
              },
            },
            title: {
              text: 'TRA RFM (Features)',
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
              // callback: function(label:any, index:any, labels:any) {
              //   console.log(label)            
              // },
              ticks: {
                // autoSkip: false,
                color: 'black',
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
              // max: 800,
              // display: this.barCurrentWeek.some(value => value !== 0) || this.barPreviousWeek.some(value => value !== 0),
              ticks: {
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
  
        plugins: []
      };
      this.chart = new Chart('MyChart2', config);
    };

  ngOnDestroy(): void {
    this.chart.destroy();

  }

}
