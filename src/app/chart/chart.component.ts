import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { CustomerTransaction } from '../interface/transactions';
import { Chart, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  // make transactionArr as input to receive the changed value from customer component
  @Input() transactionArr : CustomerTransaction[] =[]


  // special for char.js config
  @ViewChild('myChart') chartRef: ElementRef | undefined;
  myChart: Chart | undefined;
  
  //boolean flag --> to make chart appear after change in transactionArr .. after select specific customer
  isChange:boolean =true ;

  //make chart disappear At the beginning of application
  ngOnInit(): void {
    this.isChange=false
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.isChange=true
    console.log(this.transactionArr , changes);
    
    // if there is a change destroy chart
    if (this.myChart) {
      this.myChart.destroy();
    }

    //make new instance of chart
    this.createChart();

  }


   createChart() {
    const ctx = this.chartRef?.nativeElement.getContext('2d');

    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.transactionArr.map(T => T.date),
        datasets: [{
          label: 'Transaction Amount',
          data: this.transactionArr.map(T => T.amount),
          backgroundColor: ['rgb(54, 162, 235)' , 'rgb(80, 90, 100)'], // Adjust colors as needed
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Transaction Amount'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Transaction Date'
            }
          }
        }
      }
    });

  
    
    
  }


}


// export class ChartComponent implements OnChanges, OnDestroy {

//   @Input() transactionArr: CustomerTransaction[] = [];
//   @ViewChild('myChart') chartRef: ElementRef|undefined;
//   myChart: Chart |undefined ;

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['transactionArr'] && !changes['transactionArr'].firstChange) {
//       this.updateChart();
//     } else {
//       this.createChart();
//     }
//   }

//   ngOnDestroy(): void {
//     if (this.myChart) {
//       this.myChart.destroy();
//     }
//   }

//   private createChart(): void {
//     const ctx = this.chartRef?.nativeElement.getContext('2d');

//     this.myChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: this.transactionArr.map(T => T.date),
//         datasets: [{
//           label: 'Transaction Amount',
//           data: this.transactionArr.map(T => T.amount),
//           backgroundColor: 'rgb(54, 162, 235)',
//           borderColor: 'rgb(54, 162, 235)',
//           borderWidth: 1
//         }]
//       },
//       options: this.chartOptions()
//     });
//   }

//   private updateChart(): void {
//     if (this.myChart) {
//       this.myChart.data.labels = this.transactionArr.map(T => T.date);
//       this.myChart.data.datasets[0].data = this.transactionArr.map(T => T.amount);
//       this.myChart.update();
//     }
//   }

//   private chartOptions(): ChartOptions {
//     return {
//       scales: {
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Transaction Amount'
//           }
//         },
//         x: {
//           title: {
//             display: true,
//             text: 'Transaction Date'
//           }
//         }
//       }
//     };
//   }

// }