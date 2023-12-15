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
  // New Vars
  totalLabel: Array<any>;
  totalValue: Array<any>;
  selectedOption: string = 'department';
  genderIsOpen: boolean = false;
  totalDptCount: any;
  dptLabelArr: Array<any>;
  dptValueArr: Array<any>;
  selectedDepartment: string = 'TRA-ROW'
  dptName: any;
  charTitle: any = 'Departmental Feature Counts'

  switchView: boolean = true;
  totalCounts: any;
  excelData: Array<any>;
  // dptData: Array<any>;
  iconArray: Array<any>;
  appInnerHtml: any;
  cureentWeek!: number;
  previousWeek!: number;
  barCurrentWeek!: Array<any>;
  barPreviousWeek!: Array<any>;
  barLabel!: Array<any>;
  chart: any = null;

  comulativeCount: any;

  // Graphs
  rowProps: any;
  itsProps: any;
  parkProps: any;
  rfmProps: any;
  roadsProps: any;
  trfProps: any;
  cumulativeTotal: any;

  legend: Array<any>;

  rowBarLabel: Array<any>;
  rowData1: Array<any>;
  rowData2: Array<any>;
  rowData3: Array<any>;
  rowData4: Array<any>;
  rowData5: Array<any>;
  rowData6: Array<any>;
  props: any;
  @HostListener('window:resize')
  returnInnerHeight(): any {
    this.appInnerHtml = Object(window).innerHeight;
  }

  constructor(
    private http: HttpClient,
    public excelService: ExcelServiceService
  ) {
    this.excelData = [];
    this.totalLabel = [];
    this.totalValue = [];
    this.dptLabelArr = [];
    this.dptValueArr = [];

    this.iconArray = [
      'assets/picture0.jpg',
      'assets/picture01.jpg',
      'assets/picture02.jpg',
      'assets/picture03.jpg',
      'assets/picture04.jpg',
      'assets/picture05.jpg',
    ];
    // this.totalCounts = [
    //   { name: 'Departments', count: 6 },
    //   { name: 'Sections', count: 21 },
    //   { name: 'Feature Layers', count: 166 },
    // ];

    this.legend = [
      'Existing Features Updated from 4 July 2022 Untill 26 September 2023',
      'New Features created from 4 July 2022 Untill 26 September 2023',
      'Total Feature Count Untill 3 July 2022',
      'Total Feature Count Untill 30 June 2023',
      'Total Feature Count Untill 30 September 2023',
      'Total Feature Count Untill 31 March 2023',
    ];
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
      let totalCount = processedData.total;
      console.log('totlcoumntssss', totalCount);

      console.log('newdatacheck', this.excelData);
      this.excelData.forEach((el, i) => {
        let abc = el.department_last_index - el.department_start_index;
        el['f_count'] = abc + 1;
        // if(i === 5)
        // {
        //   el['f_count'] = abc - 8
        // }
      });

      for (let i = 0; i < this.excelData.length; i++) {
        this.excelData[i]['icon'] = this.iconArray[i];
      }

      this.getdpt(this.excelData);

      this.comulativeCount = totalCount;

      this.rowProps = this.excelData[0];
      this.itsProps = this.excelData[1];
      this.parkProps = this.excelData[2];
      this.rfmProps = this.excelData[3];
      this.roadsProps = this.excelData[4];
      this.trfProps = this.excelData[5];
      this.props = this.excelData[0];

      console.log('Processed data in component:', this.excelData);
      console.log('sdasdad', this.props);
      this.getTotalCount(totalCount);
      if (this.selectedOption == 'department') {
        
        this.VisualizebyDpt(this.excelData);
        this.createChart();
      }


      
    });
  }
  ngOnInit(): void {
    //
    // this.readExcelFile()
    // setTimeout(() => {
    // }, 100);
  }

  VisualizebyDpt(data: any) {
    const arr: Array<any> = [];
    const resultArrays = [];

    const cleanedData = JSON.parse(JSON.stringify(data), (key, value) =>
      Array.isArray(value)
        ? value.map((item) =>
            typeof item === 'string' && !isNaN(Number(item))
              ? Number(item)
              : item
          )
        : value
    );

    console.log('modifiedData', cleanedData);

    for (let i = 0; i < cleanedData.length; i++) {
      let keysToSum = [
        'Total Feature Count Untill 3 July 2022',
        'Total Feature Count Untill 30 June 2023',
        'Total Feature Count Untill 30 September 2023',
        'Total Feature Count Untill 31 March 2023',
        'New Features created from 4 July 2022 Untill 26 September 2023',
        'Existing Features Updated from 4 July 2022 Untill 26 September 2023',
      ];
      let tempArray: any = [];
      keysToSum.forEach((key, j) => {
        if (Array.isArray(cleanedData[i][key])) {
          tempArray.push(this.sumArray(cleanedData[i][key]));
        }
      });

      let obj = {
        label: cleanedData[i].department_name,
        value: tempArray,
      };

      this.dptValueArr.push(obj);
    }

    

    console.log('fff0', this.dptValueArr)



    
    
  }

  sumArray(arr: number[]): number {
    return arr.reduce((sum, num) => sum + num, 0);
  }

  createChart() {

    let data: any;
    let dataSet: Array<any> = [];
    const backGroundColor = [
      '#16639B',
      '#7A8762',
      '#FF9422',
      '#8D99FD',
      '#D7EAA8',
      '#FD635C',
    ];

    const borderColor = [
      '#16639B',
      '#7A8762',
      '#FF9422',
      '#8D99FD',
      '#D7EAA8',
      '#FD635C',
    ]

    this.dptValueArr.forEach((el, i) => {
      dataSet.push({
        label: this.totalLabel[i],
        data: el.value,
        backgroundColor: backGroundColor[i],

        hoverBackgroundColor: backGroundColor[i],
        // barThickness: 16,
        // borderWidth: 1,
          borderRadius: 3,
          // borderColor: borderColor[i]
      });
    });
    console.log('eeeee', dataSet);
    this.dptLabelArr = this.dptValueArr.map((item) => item.label)

    data = {
      labels: this.dptLabelArr,
      datasets: dataSet,
    };
    console.log('dddddddd', data);

    const config: any = {
      type: 'bar',
      data,
      options: {
        
        barPercentage: 0.9,
        categoryPercentage: 0.7,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            // position: 'bottom',
            title: {
              display: false,
            },
            labels: {
              usePointStyle: true,
              font: {
                size: 11,
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
                return 'Feature Count' + ': ' + label;
              },
            },
          },
          title: {
            text: this.charTitle,
            display: true,
            align: 'start',
            color: '#595959',
            font: {
              size: 13,
              family: 'Manrope',
            },
          },
        },

        scales: {
          x: {
            ticks: {
              font: {
                size: 11,
                family: 'Manrope',
              },
            },

            grid: {
              display: false,
            },
          },
          y: {
            // suggestedMax: 1200000,
            ticks: {
              callback: (value: any, index: any, values: any) => {
                return value >= 1000 ? value / 1000 + 'k' : value;
              },
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

      plugins: [
        {
          id: 'legendMargin',
          beforeInit: function (chart: Chart) {
            if (chart.legend) {
              const originalFit = (chart.legend as any).fit;

              (chart.legend as any).fit = function fit() {
                originalFit.bind(chart.legend)();
                this.options.labels.padding = 18;
                this.height += 5;
              };
            }
          },
        },
      ],
    };
    this.chart = new Chart('MyChart', config);
    
  }

  getColor(index: number): string {
    const colors = [
      '#33CCCC',

      '#7B33FA',
      '#F9A037',

      '#0071BC',
      '#4B955F',
      '#CE016A',
    ];
    return colors[index % colors.length];
  }

  getlegendColor(index: number): string {
    const colors = [
      '#16639B',

      '#7A8762',
      '#FF9422',

      '#8D99FD',
      '#D7EAA8',
      '#FD635C',
    ];
    return colors[index % colors.length];
  }

  getdpt(data: any) {
    const cloneArr: Array<any> = JSON.parse(JSON.stringify(data));
    const totalSectionCount = cloneArr.reduce(
      (acc, obj) => {
        const sections = acc.sections + obj.sections.length;
        const features = acc.features + obj['f_count'];
        return {
          sections,
          features,
        };
      },
      { sections: 0, features: 0 }
    );

    this.totalCounts = [
      { name: 'Departments', count: cloneArr.length },
      { name: 'Sections', count: totalSectionCount.sections },
      { name: 'Feature Layers', count: totalSectionCount.features },
    ];
  }

  getObjectKeys(obj: any): string[] {
    if (obj) {
      return Object.keys(obj);
    } else {
      return [];
    }
  }

  onSelectionChange() {
    if (this.selectedOption === 'department') {
      this.dptValueArr = [];
      this.dptLabelArr = [];
      this.VisualizebyDpt(this.excelData)
      let dataSet: Array<any> = [];
      const backGroundColor = [
        '#16639B',
        '#7A8762',
        '#FF9422',
        '#8D99FD',
        '#D7EAA8',
        '#FD635C',
      ];
  
      this.dptValueArr.forEach((el, i) => {
        dataSet.push({
          label: this.totalLabel[i],
          data: el.value,
          backgroundColor: backGroundColor[i],
  
          hoverBackgroundColor: backGroundColor[i],
          // barThickness: 16,
          borderRadius: 3,
        });
      });
      this.charTitle = 'Departmental Feature Counts'
      this.dptLabelArr = this.dptValueArr.map((item) => item.label)
      this.chart.data.datasets = dataSet
      this.chart.data.labels = this.dptLabelArr
      this.chart.options.plugins.title.text = this.charTitle
      this.chart.options.barPercentage = 0.9
    this.chart.options.categoryPercentage = 0.7
      this.chart.update()

      
    } else {
      this.selectedDepartment = 'TRA-ROW'
      this.charTitle = 'TRA-ROW (Features by Section)'
     this.setDptNum(0)

      // this.chart.update()

      // this.createChart()
    }
  }

  onDepartmentChange() {
    console.log('Selected Department:', this.selectedDepartment);
    switch(this.selectedDepartment)
    {
      case 'TRA-ROW':
        this.charTitle = 'TRA-ROW (Features by Section)'
        this.setDptNum(0)
        break;
        case 'TRA-ITS':
          this.charTitle = 'TRA-ITS (Features by Section)'
          this.setDptNum(1)
          break;
          case 'TRA-PRK':
            this.charTitle = 'TRA-PRK (Features by Section)'
            this.setDptNum(2)
        break;
        case 'RFM':
          this.charTitle = 'RFM (Features by Section)'
          this.setDptNum(3)
        break;
        case 'TRA-ROADS':
          this.charTitle = 'TRA-ROADS (Features by Section)'
          this.setDptNum(4)
        break;
        case 'TRA-TRAF':
          this.charTitle = 'TRA-TRAF (Features by Section)'
          this.setDptNum(5)
        

    }
    // You can perform additional actions based on the selected department
  }

  handlePanel() {
    this.genderIsOpen = !this.genderIsOpen;
  }

  getTotalCount(totalCount: any) {
    let lable: Array<any> = [];
    for (const [key, value] of Object.entries(totalCount)) {
      lable.push(key);
      this.totalValue.push(value);
    }
    this.totalLabel = this.shortenLegend(lable);
    console.log('newlabel', this.totalLabel);
    console.log('totalvalue', this.totalValue);
  }

  shortenLegend(legend: any) {
    const shortenedLegend = legend.map((item: any) => {
      const parts = item.split(' ');
      const featureType = parts[0];

      switch (featureType) {
        case 'Existing':
          return 'Updated as of ' + parts.slice(5).join(' ');
        case 'New':
          return 'New as of ' + parts.slice(5).join(' ');
        case 'Total':
          return 'As of ' + parts.slice(4).join(' ');
        default:
          return item;
      }
    });

    return shortenedLegend;
  }

  setDptNum(index:any)
  {
    this.dptValueArr = [];
    this.dptLabelArr = [];
    let dataSet: Array<any> = [];
    const backGroundColor = [
      '#16639B',
      '#7A8762',
      '#FF9422',
      '#8D99FD',
      '#D7EAA8',
      '#FD635C',
    ];
    const dptName = this.excelData[index];
    this.dptLabelArr = dptName.sections.map((item:any) => item.name)
    this.dptValueArr = [
      dptName['Total Feature Count Untill 3 July 2022'],
      dptName['Total Feature Count Untill 31 March 2023'],
      dptName['Total Feature Count Untill 30 June 2023'],
      dptName['Total Feature Count Untill 30 September 2023'],
      dptName['New Features created from 4 July 2022 Untill 26 September 2023'],
      dptName['Existing Features Updated from 4 July 2022 Untill 26 September 2023']
    ];
    console.log('sec', this.dptValueArr);
    console.log('checkdataaaaa', this.chart.data)

    this.dptValueArr.forEach((el, i) => {
      
      dataSet.push({
        label: this.totalLabel[i],
        data: el,
        backgroundColor: backGroundColor[i],

        hoverBackgroundColor: backGroundColor[i],
        // barThickness: 16,
        borderRadius: 3,
      });
    });
    console.log('eeeee', dataSet);
    console.log('ffccccc', this.dptLabelArr)
    
  
    
    this.chart.data.datasets = dataSet
    this.chart.data.labels = this.dptLabelArr
    this.chart.options.plugins.title.text = this.charTitle
    
    this.chart.options.barPercentage = 0.9
    this.chart.options.categoryPercentage = 0.7
    
    this.chart.update()
  
  }
}
