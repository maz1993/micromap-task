import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-its-graph',
  templateUrl: './its-graph.component.html',
  styleUrls: ['./its-graph.component.scss']
})
export class ItsGraphComponent implements OnInit, OnDestroy {

  props: any
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

  ngOnInit(): void {


    setTimeout(() => {
        if(localStorage.getItem('excelData'))
    {
      const abc = localStorage.getItem('excelData') as string
      this.graphData = JSON.parse(abc)
      this.props = this.graphData[1]

      const dataArray1 = this.props['Existing Features Updated from 4 July 2022 Untill 26 September 2023']
      const dataArray2 = this.props['New Features created from 4 July 2022 Untill 26 September 2023']
      const originalArray1 = this.props['Total Feature Count Untill 3 July 2022']
      const dataArray3 = originalArray1.map((element:any) => (element === '-' ? 0 : element));
      const dataArray4 = this.props['Total Feature Count Untill 30 June 2023']
      const dataArray5 = this.props['Total Feature Count Untill 30 September 2023']
      const originalArray2 = this.props['Total Feature Count Untill 31 March 2023'];
      const dataArray6 = originalArray2.map((element:any) => (element === '-' ? 0 : element));
      const label = this.props['Feature Class Name'];

      for (let i = 0; i < dataArray1.length; i++) {
        if (dataArray1[i] > 0 || dataArray2[i] > 0 || dataArray3[i] > 0 ||  dataArray4[i] > 0 || dataArray5[i] > 0 || dataArray6[i] > 0) {
          this.rowData1.push(dataArray1[i]);
          this.rowData2.push(dataArray2[i]);
          this.rowData3.push(dataArray3[i]);
          this.rowData4.push(dataArray4[i]);
          this.rowData5.push(dataArray5[i]);
          this.rowData6.push(dataArray6[i]);
          this.rowBarLabel.push(label[i]);
        }
    }
      console.log('data', this.props )
     
        this.createChart()
   
    }
        
      }, 250);
  }



  createChart() {
    let data: any;
    
    
    data = {
      labels: this.rowBarLabel,
      datasets: [
        {
          label: 'Updated Count Untill 3 July 2022',
          data: this.rowData1,
          pointBackgroundColor: ['#5DADE2'],
          borderColor: '#5DADE2',
          // backgroundColor: ['#fff'],
          barPercentage: 1,
          // hoverBackgroundColor: ['#5DADE2'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Created Count Untill 31 March 2023',
          data: this.rowData2,
          // backgroundColor: ['#5BCBFF'],
          barPercentage: 1,
          pointBackgroundColor: ['#5BCBFF'],
          borderColor: '#5BCBFF',
          // hoverBackgroundColor: ['#5BCBFF'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 June 2023',
          data: this.rowData3,
          // backgroundColor: ['#24B8FD'],
          barPercentage: 1,
          pointBackgroundColor: ['#24B8FD'],
          borderColor: '#24B8FD',
          // hoverBackgroundColor: ['#24B8FD'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 September 2023',
          data: this.rowData4,
          // backgroundColor: ['#0092D6'],
          barPercentage: 1,
          pointBackgroundColor: ['#0092D6'],
          borderColor: '#0092D6',
          // hoverBackgroundColor: ['#0092D6'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 September 2023',
          data: this.rowData5,
          // backgroundColor: ['#0072A7'],
          barPercentage: 1,
          pointBackgroundColor: ['#0072A7'],
          borderColor: '#0072A7',
          // hoverBackgroundColor: ['#0072A7'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 September 2023',
          data: this.rowData6,
          // backgroundColor: ['#004F74'],
          barPercentage: 1,
          pointBackgroundColor: ['#004F74'],
          borderColor: '#004F74',
          // hoverBackgroundColor: ['#004F74'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        
      ],
    
  }

    const config: any = {
      type: 'line', 
      data,
      options: {
        // aspectRatio:2.5,
        // indexAxis: 'y',
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
                // console.log(tooltipItem.tooltipItems[0])
                return tooltipItem.tooltipItems[0].dataset.backgroundColor;
              }
            },
            callbacks: {
              label: (tooltipItem: any): any => {
                let label = tooltipItem.dataset.data[tooltipItem.dataIndex];
                return 'Feature Count' + ' ' + label;
              },
            },
          },
          title: {
            text: 'TRA-ITS (Features)',
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
                size: 5,
                family: 'Manrope',
                // color: '#000'
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
              color: '#17202A',
              // crossAlign: 'far',
              // mirror: true,
              // padding: -10,
              // callback: function (value: any, index: any) {
              //   if (value.length === 0) {
              //     return 'No Data';
              //   } else {
              //     let str = 'QAR';
              //     return str + ' ' + value;
              //   }

              // },
              font: {
                size: 7,
                family: 'Manrope',
                color: '#000'
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
    this.chart = new Chart('MyChart1', config);
  };

  ngOnDestroy(): void {
    this.chart.destroy();

  }

}
