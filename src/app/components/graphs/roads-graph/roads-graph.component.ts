import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-roads-graph',
  templateUrl: './roads-graph.component.html',
  styleUrls: ['./roads-graph.component.scss']
})
export class RoadsGraphComponent implements OnInit, OnChanges {

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

    this.graphData = [ this.rowData3[0], this.rowData4[0], this.rowData5[0], this.rowData6[0], this.rowData1[0], this.rowData2[0], ]
    this.rowBarLabel = [this.rowBarLabel[0], this.rowBarLabel[0], this.rowBarLabel[0], this.rowBarLabel[0], this.rowBarLabel[0], this.rowBarLabel[0], ]
    console.log('rrrrrr', this.rowBarLabel)

     this.chartInIt()
    }
    }



    chartInIt() {
      let data: any;
       data = {
        labels: this.rowBarLabel,
        datasets: [{
          label: 'My First Dataset',
          data: this.graphData,
          backgroundColor: [
            
            '#BB8DB5',
            '#9884AE',
            '#F5B391',
            '#FCDA8C',
            '#DD9AA9',
            '#7F7F81',
          ],
          hoverOffset: 13,
          borderColor: '#fff',
          hoverBorderColor: '#fff',
          hoverBackgroundColor : [
            
            '#BB8DB5',
            '#9884AE',
            '#F5B391',
            '#FCDA8C',
            '#DD9AA9',
            '#7F7F81',
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
                  console.log(tooltipItem)
                  return tooltipItem.tooltip.labelColors[0].backgroundColor;
                }
              },
            },
            title: {
              text: 'TRA ROADS (Features)',
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
  
      this.chart = new Chart('MyChart4', config);
    }

  ngOnDestroy(): void {
    this.chart.destroy();

  }
}
