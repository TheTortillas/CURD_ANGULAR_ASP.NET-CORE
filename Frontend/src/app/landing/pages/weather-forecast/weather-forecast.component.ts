import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WeatherforecastService } from '../../../services/weatherforecast.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})

export class WeatherForecastComponent implements OnInit {
  climas: any[] = [];
  private platformId = inject(PLATFORM_ID);

  constructor(private weatherForecastService: WeatherforecastService) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.weatherForecastService.getWeatherForecast().subscribe(result => {
        this.climas = result;
        console.log(result);
      });
    }
  }
}


// export class AppComponent {
//   climas: any[] = [];

//   constructor(private WeatherForecastService: WeatherforecastService) {
//     this.WeatherForecastService.getWeatherForecast().subscribe(result => {
//       this.climas = result;
//       console.log(result);
//     });
//   }
// }
