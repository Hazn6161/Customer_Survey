import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';  // Import the service
import { ApexChart, ApexAxisChartSeries, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexLegend, ApexGrid, ApexTitleSubtitle } from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;  // Ensure title is included in ChartOptions
};

@Component({
  selector: 'app-feedback-chart',
  templateUrl: './feedback-chart.component.html',
  styleUrls: ['./feedback-chart.component.css']
})

export class FeedbackChartComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: FeedbackChartComponent;

  public chartOptions: Partial<ChartOptions> = {};
  totalResult: number = 0;
  private refreshInterval: any; // To store the interval ID

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getFeedbackData(); // Initial data fetch
    this.startRefreshTimer(); // Start the timer for refresh
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval); // Clear the interval when component is destroyed
    }
  }

  getFeedbackData() {
    this.api.getbarchartdata().subscribe((data) => {
      // Set totalResult from API response
      this.totalResult = data.totalResult;  // Assuming the API response has a totalResult field

      // Map the API response to match the chart format
      const feedbackData = [
        data.excellent,   // Replace with API response values
        data.good,
        data.medium,
        data.poor,
        data.veryBad
      ];

      // Setting the chart options with API data
      this.chartOptions = {
        series: [
          {
            name: "Count",
            data: feedbackData,  // Replace static data with dynamic API data
          }
        ],
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              console.log(chart, w, e);
            }
          }
        },
        colors: [
          "#38953A",
          "#97DA47",
          "#F6CE04",
          "#EF640D",
          "#DD322E"
        ],
        plotOptions: {
          bar: {
            columnWidth: "40%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: true, // Enable data labels
          style: {
            fontSize: "30px",
            colors: ["#fff"], // Set color for the data labels
          },
          dropShadow: {
            enabled: true, // Add shadow for better visibility
            top: 1,
            left: 1,
            blur: 1,
            opacity: 0.75
          }
        },
        legend: {
          show: true,
          fontSize: "20px",
          itemMargin: {
            vertical: 10, // Adds space vertically between the legend items
            horizontal: 30, // Adds space horizontally between the legend items
          }
        },
        grid: {
          show: false
        },
        xaxis: {
          categories: [
            "Excellent", "Good", "Average", "Poor", "Bad"
          ],
          labels: {
            style: {
              colors: [
                "#38953A",
                "#97DA47",
                "#F6CE04",
                "#EF640D",
                "#DD322E"
              ],
              fontSize: "20px",
            }
          }
        },
        title: {
          text: `Total Feedback Results: ${this.totalResult}`,  // Display totalResult in the title
        }
      };
    },
    (error) => {
      console.error('Error fetching data from API', error);
    });
  }

  startRefreshTimer() {
    // Set a timer to refresh the data every 10 seconds
    this.refreshInterval = setInterval(() => {
      this.getFeedbackData();
    }, 10000); // 10000ms = 10 seconds
  }
}
