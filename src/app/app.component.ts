import { Component, HostListener, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { ExcelServiceService } from './services/excel-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'data_visualization_dashboard';
  switchView: boolean = true
  totalCounts: any;
  excelData: Array<any>
  iconArray: Array<any>
  appInnerHtml: any;
  cureentWeek!: number;
  previousWeek!: number;
  barCurrentWeek!: Array<any>;
  barPreviousWeek!: Array<any>;
  barLabel!: Array<any>;
  chart: any = null;
  



  date1:Array<any>
  date2:Array<any>
  date3:Array<any>
  date4:Array<any>
  @HostListener('window:resize')
  returnInnerHeight(): any {
    this.appInnerHtml = Object(window).innerHeight;
  }

  constructor(private http: HttpClient, public excelService: ExcelServiceService) {
    this.excelData = [];
    this.iconArray = ['assets/picture0.jpg', 'assets/picture01.jpg','assets/picture02.jpg','assets/picture03.jpg','assets/picture04.jpg','assets/picture05.jpg']
    this.totalCounts = [
      { name: 'Departments', count: 6 },
      { name: 'Sections', count: 21 },
      { name: 'Feature Layers', count: 166 },
    ];
    this.returnInnerHeight();
    // this.cureentWeek = 365;
    this.barLabel = [
      'FENCING_NOCS',
      'TSPS_APPLICATIONS',
      'ROW_INSP_GENERAL_AREAS',
      'ROW_INSP_UC_RD_PROJ',
      'ROW_INSP_DEVELOPER_AREAS',
      'RTA_SPARE_DUCTS',
      'NOC_DEVELOPMENT_PROJECTS',
      'ROW_CROSSSECT_COMP_RD_PROJ',
      'ROW_CROSSSECT_DESIGNED_RD_PROJ',
      'ROW_CROSSSECT_UC_RD_PROJ',
      'ROW_US_RD_PROJ',
      'ROW_NETWORK_PROJECTS',
      'RTA_GATE_LEVELS',
      'TRAFFIC_DIVERSIONS'
    ];
   
    this.date1 = [
      0, 0,0,0,0, 15337,
      6,
      35,
      2,
      1,
      0,
      0,
      4448,
      0
      
    ];
    this.date2 = [
      0, 0,0,0,0,20200,
      43,
      229,
      27,
      19,
      17,
      0,
      10654,
      0
      
    ];
    this.date3 = [
      0, 0,0,0,0,
      21890,
57,
321,
33,
19,
16,
0,
14685,
0

    ];
    this.date4 = [
      0,0,285,0,120,
      24967,
97,
343,
71,
19,
16,
0,
19488,
0

    ]

    // this.excelService.readExcelFile().then((processedData) => {
      
    //   this.excelData = processedData
    //   for(let i = 0; i < this.excelData.length; i ++)
    //   {
    //     this.excelData[i]['icon'] = this.iconArray[i]
    //     // console.log(this.excelData)
    //   }
    //   console.log('Processed data in component:', this.excelData);
    // });

    

  }
  ngOnInit(): void {
    // this.createChart()
    // this.readExcelFile()
    
  }

  chartInit()
  {
    let data:any
    data = {

    }

  }

  createChart() {
    let data: any;
    data = {
      // values on X-Axis
      labels: this.barLabel,
      datasets: [
        {
          label: 'Count Untill 3 July 2022',
          data: this.date1,
          backgroundColor: ['#ABEBC6'],

          // borderColor: ['rgba(75, 192, 192, 1)'],
          barPercentage: 1,
          hoverBackgroundColor: ['#00FF00'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: ' Count Untill 31 March 2023',
          data: this.date2,
          backgroundColor: ['#AED6F1'],

          // borderColor: ['rgba(75, 192, 192, 1)'],
          barPercentage: 1,
          hoverBackgroundColor: ['#00FF00'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 June 2023',
          data: this.date3,
          backgroundColor: ['#EBDEF0'],

          // borderColor: ['rgba(75, 192, 192, 1)'],
          barPercentage: 1,
          hoverBackgroundColor: ['#00FF00'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        {
          label: 'Count Untill 30 September 2023',
          data: this.date4,
          backgroundColor: ['#F2D7D5'],

          // borderColor: ['rgba(75, 192, 192, 1)'],
          barPercentage: 1,
          hoverBackgroundColor: ['#00FF00'],
          categoryPercentage: 0.5,
          barThickness: 6,
        },
        
      ],
    };

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

      plugins: []
    };
    this.chart = new Chart('MyChart', config);
  };


getColor(index: number): string {
  const colors = ['#5DADE2', '#5BCBFF', '#24B8FD', '#0092D6', '#0072A7', '#004F74'];
  return colors[index % colors.length];
}

onChangeView()
{
  this.switchView = !this.switchView
}


  
}
