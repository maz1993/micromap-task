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
  switchView: boolean = true;

  constructor() {}

  ngOnInit(): void {}


  onChangeView() {
    this.switchView = !this.switchView;
  }
}
