import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcelServiceService {


  constructor(private http: HttpClient) {
    
  }

  readExcelFile(): Promise<any> {
    const excelFileUrl = 'assets/tra.xlsx';

    return new Promise((resolve, reject) => {
      this.http.get(excelFileUrl, { responseType: 'arraybuffer' }).subscribe(
        (arrayBuffer: ArrayBuffer) => {
          const data: string = this.arrayBufferToString(arrayBuffer);
          const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
          const sheetName: string = workbook.SheetNames[0];
          const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: '',
          });

          // console.log(jsonData);

          const processedData = this.processData(jsonData);
          // console.log(processedData);
          resolve(processedData);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  arrayBufferToString(buffer: ArrayBuffer): string {
    const dataView = new DataView(buffer);
    let binaryString = '';
    for (let i = 0; i < dataView.byteLength; i++) {
      binaryString += String.fromCharCode(dataView.getUint8(i));
    }
    return binaryString;
  }

  private async processData(data: any) {
    var tempArray = [];

    for (var i = 0; i < data.length; i++) {
      data[i].splice(0, 1);
      data[i].splice(2, 1);
      const tempLength = data[i].length;
      data[i].splice(tempLength - 1, 1);
      data[i].splice(tempLength - 2, 1);
      // console.log('modified data array: ', data[i])
    }
    // console.log('data array length: ', data)

    var tempDepartments = [];
    for (var i = 1; i < data.length; i++) {
      const tempArr = data[i];
      const department = tempArr[0];
      // console.log('department name', department)

      var lastSavedDepartment: any = '';

      if (tempDepartments.length == 0) {
        const firstObj = {
          department_name: department,
          department_start_index: 1,
          department_last_index: 0,
        };
        tempDepartments.push(firstObj);
      } else {
        lastSavedDepartment = tempDepartments[tempDepartments.length - 1];
        // console.log(' last saved department', department)

        if (department != '') {
          if (department != lastSavedDepartment) {
            lastSavedDepartment.department_last_index = i - 1;
            const obj: any = {
              department_name: department,
              department_start_index:
                tempDepartments[tempDepartments.length - 1]
                  .department_last_index + 1,
              department_last_index: i - 1,
            };
            tempDepartments.push(obj);
          }
        }
      }
    }

    tempDepartments[tempDepartments.length - 1].department_last_index =
      data.length - 2;

    // console.log('departments length', tempDepartments)

    for (var i = 0; i < tempDepartments.length; i++) {
      var tempSections = [];

      const startIndex = tempDepartments[i].department_start_index;
      const lastIndex = tempDepartments[i].department_last_index;

      for (var j = startIndex; j <= lastIndex; j++) {
        var tempData: any = 0;

        var value: any = 0;

        if (i == tempDepartments.length - 1) {
          tempData = data[j];
          value = tempData[1];
        } else {
          tempData = data[j];
          value = tempData[1];
        }

        if (value != '') {
          var lastSavedSection: any = '';

          if (tempSections.length == 0) {
            const firstObj = {
              name: value,
              first_index: startIndex,
              last_index: 0,
            };
            tempSections.push(firstObj);
          } else {
            lastSavedSection = tempSections[tempSections.length - 1];

            if (value != '') {
              if (value != lastSavedSection) {
                // console.log('last index: ', j)
                lastSavedSection.last_index = j - 1;

                var tempLastValue = j - 1;

                if (j == lastIndex + 1) {
                  tempLastValue = j;
                }
                const obj: any = {
                  name: value,
                  first_index:
                    tempSections[tempSections.length - 1].last_index + 1,
                  last_index: tempLastValue,
                };
                tempSections.push(obj);
              }
            }
          }
        }
        if (j == lastIndex) {
          //   console.log('last index: ', lastIndex)
          tempSections[tempSections.length - 1].last_index = j;
        }
      }

      tempDepartments[i].sections = tempSections;
      //  console.log('temp sections' ,tempDepartments[i].sections)
    }

    // console.log('temp sections' ,tempDepartments)

    var headings = data[0];
    for (var k = 0; k < tempDepartments.length; k++) {
      //   var arr ="";
      for (var i = 2; i < headings.length; i++) {
        const arr = headings[i];
        tempDepartments[k][arr] = [];
      }
    }

    for (var i = 0; i < tempDepartments.length; i++) {
      // var tempSections = []
      //   console.log('temp sections', tempDepartments[i].sections)

      const startIndex = tempDepartments[i].department_start_index;
      const lastIndex = tempDepartments[i].department_last_index;

      for (var m = 2; m < headings.length; m++) {
        const firstHeading = headings[m];
        // console.log('item found', firstHeading)
        var index = -1;
        var firstItem = data[0];
        // console.log('first array', firstItem)
        for (var l = 0; l < firstItem.length; l++) {
          if (firstHeading == firstItem[l]) {
            index = l;
            break;
          }
        }

        var array = [];

        if (i == tempDepartments.length - 1) {
          const totalSections = tempDepartments[i].sections;
          for (var g = 0; g < totalSections.length; g++) {
            const firstIndex = totalSections[g].first_index;
            const lastIndex = totalSections[g].last_index;
            //  console.log('first index',firstIndex )
            //  console.log('last index',lastIndex )
            var totalCount: any = 0;
            for (var h = firstIndex; h <= lastIndex; h++) {
              tempData = data[h];
              //   console.log('temp data index',index)

              if (tempData == null) {
              } else {
                var value = tempData[index];

                var tempVale = '';
                if (index == 4) {
                  // console.log('get value', value)
                }

                if (value == '-') {
                  totalCount = totalCount;
                } else {
                  //  console.log('temp data count',value)
                  totalCount = totalCount + value;
                }
              }

              //   console.log('array size:', array)
            }
            array.push(totalCount);
            //   array.push(tempData[index])
          }
          //  tempData = data[j]
          //     array.push(tempData[index])
        } else {
          const totalSections = tempDepartments[i].sections;
          for (var g = 0; g < totalSections.length; g++) {
            const firstIndex = totalSections[g].first_index;
            const lastIndex = totalSections[g].last_index;
            //  console.log('first index',firstIndex )
            //  console.log('last index',lastIndex )
            var totalCount: any = 0;
            for (var h = firstIndex; h <= lastIndex; h++) {
              tempData = data[h];
              //   console.log('temp data index',index)

              if (tempData == null) {
              } else {
                var value = tempData[index];

                var tempVale = '';
                if (value == '-') {
                  totalCount = totalCount + '';
                } else {
                  //  console.log('temp data count',value)
                  totalCount = totalCount + value;
                }
              }

              //   console.log('array size:', array)
            }
            array.push(totalCount);
            //   array.push(tempData[index])
          }
          //  tempData = data[j]
          //     array.push(tempData[index])
        }
        for (var j = startIndex + 1; j <= lastIndex + 1; j++) {
          var tempData = null;
          // console.log('temp data', tempData)

          if (i == tempDepartments.length - 1) {
            // tempData = data[j-2]
            // array.push(tempData[index])
          } else {
          }

          tempDepartments[i][firstHeading] = array;
          // const daaa = tempDepartments[i]

          // console.log(daaa)
        }
      }
    }

    // console.log('departments', tempDepartments)

    var finalData = {
      departments: tempDepartments,
      total: null,
    };

    var totalData: any = {};
    var item = data[data.length - 1];
    // console.log('item', item)

    for (var i = 4; i < headings.length; i++) {
      const keyName = headings[i];
      const value = item[i];

      totalData[keyName] = value;
      // console.log('key name',keyName)
    }
    finalData.total = totalData;
    // console.log(finalData);

    return finalData;
  }
}
