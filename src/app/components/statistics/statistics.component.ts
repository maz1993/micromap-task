import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { Chart } from 'chart.js';
import { RowGraph } from 'src/app/models';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  title = 'data_visualization_dashboard';
  switchView: boolean = true;
  totalCounts: any;
  excelData: Array<any>;
  iconArray: Array<any>;
  appInnerHtml: any;
  cureentWeek!: number;
  previousWeek!: number;
  barCurrentWeek!: Array<any>;
  barPreviousWeek!: Array<any>;
  barLabel!: Array<any>;
  chart: any = null;

  comulativeCount:any

  // Graphs
  rowProps: any;
  itsProps: any;

  legend: Array<any>

  rowBarLabel: Array<any>
  rowData1: Array<any>
  rowData2: Array<any>
  rowData3: Array<any>
  rowData4: Array<any>
  rowData5: Array<any>
  rowData6: Array<any>
  props: any
  @HostListener('window:resize')
  returnInnerHeight(): any {
    this.appInnerHtml = Object(window).innerHeight;
  }

  constructor(
    private http: HttpClient,
    public excelService: ExcelServiceService
  ) {
    this.excelData = [];
    this.iconArray = [
      'assets/picture0.jpg',
      'assets/picture01.jpg',
      'assets/picture02.jpg',
      'assets/picture03.jpg',
      'assets/picture04.jpg',
      'assets/picture05.jpg',
    ];
    this.totalCounts = [
      { name: 'Departments', count: 6 },
      { name: 'Sections', count: 21 },
      { name: 'Feature Layers', count: 166 },
    ];

    this.legend = [
      'Existing Features Updated from 4 July 2022 Untill 26 September 2023',
      'New Features created from 4 July 2022 Untill 26 September 2023',
      'Total Feature Count Untill 3 July 2022',
      'Total Feature Count Untill 30 June 2023',
      'Total Feature Count Untill 30 September 2023',
      'Total Feature Count Untill 31 March 2023'
    ]
    this.returnInnerHeight();
    // this.cureentWeek = 365;
    this.rowBarLabel = [];
    this.rowData1 = [];
    this.rowData2 = [];
    this.rowData3 = [];
    this.rowData4 = [];
    this.rowData5 = [];
    this.rowData6 = [];

    this.excelService.readExcelFile().then((processedData) => {
      this.excelData = processedData.departments;
      this.comulativeCount = processedData.total

      for (let i = 0; i < this.excelData.length; i++) {
        this.excelData[i]['icon'] = this.iconArray[i];
        // console.log(this.excelData)
      }

      // this.rowProps.rowBarLabel = this.excelData[0]['Feature Class Name'];
      this.rowProps = this.excelData[0]
      this.itsProps = this.excelData[1]
      this.props = this.excelData[0]

      this

      console.log('Processed data in component:', this.excelData);
      console.log('sdasdad', this.props)

      if(this.props)
    {
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
    }
    console.log('1', this.rowData1)
    console.log('2', this.rowData2)
    console.log('4', this.rowData3)
    console.log('5', this.rowData4)
    console.log('6', this.rowData5)
    console.log('7', this.rowData6)
    console.log('8', this.rowBarLabel)
    setTimeout(() => {
      // this.createChart()
    }, 1000);
    });
  }
  ngOnInit(): void {
    
    // 
    // this.readExcelFile()
    
    // setTimeout(() => {
      
    // }, 100);
    
  }

  chartInit() {
    let data: any;
    data = {};
  }

  createChart() {
    let data: any;
    if (this.props) {
      console.log('Data has not arrived yet.');
    } else {
    data = {
      labels: this.rowBarLabel,
      datasets: [
        {
          label: 'Updated Count Untill 3 July 2022',
          data: this.rowData1,
          backgroundColor: ['#5DADE2'],
          barPercentage: 1,
          hoverBackgroundColor: ['#5DADE2'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Created Count Untill 31 March 2023',
          data: this.rowData2,
          backgroundColor: ['#5BCBFF'],
          barPercentage: 1,
          hoverBackgroundColor: ['#5BCBFF'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 June 2023',
          data: this.rowData3,
          backgroundColor: ['#24B8FD'],
          barPercentage: 1,
          hoverBackgroundColor: ['#24B8FD'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 September 2023',
          data: this.rowData4,
          backgroundColor: ['#0092D6'],
          barPercentage: 1,
          hoverBackgroundColor: ['#0092D6'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 September 2023',
          data: this.rowData5,
          backgroundColor: ['#0072A7'],
          barPercentage: 1,
          hoverBackgroundColor: ['#0072A7'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 September 2023',
          data: this.rowData6,
          backgroundColor: ['#004F74'],
          barPercentage: 1,
          hoverBackgroundColor: ['#004F74'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        
      ],
    };
  }

    const config: any = {
      type: 'bar', //this denotes tha type of chart
      data,
      options: {
        // aspectRatio:2.5,
        // indexAxis: 'y',
        maintainAspectRatio: false,

        plugins: {
          legend: {
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
                size: 12,
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
                return 'revenu' + ' ' + label;
              },
            },
          },
          title: {
            text: 'Revenue Weekly',
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
              // color: 'red',
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
                size: 11,
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
    this.chart = new Chart('MyChart', config);
  }

  getColor(index: number): string {
    const colors = [
      '#004F74',
      
      '#004F74',
      '#0072A7',
      
      '#0072A7',
      '#0092D6',
      '#0092D6',
    ];
    return colors[index % colors.length];
  }

  getlegendColor(index: number): string 
  {
    const colors = [
      '#5DADE2',
      
      '#5BCBFF',
      '#24B8FD',
      
      '#0092D6',
      '#0072A7',
      '#004F74',
    ];
    return colors[index % colors.length];
  }

  getObjectKeys(obj: any): string[] {
    if (obj) {
      return Object.keys(obj);
    } else {
      return [];
    }
    
  }
}

// '#004F74',
//       '#0072A7',
//       '#0092D6',
      
//       '#5DADE2',
//       '#24B8FD',
//       '#5BCBFF',
