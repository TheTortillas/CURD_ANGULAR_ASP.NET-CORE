import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const HttpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})};

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {

  constructor(private httpClient: HttpClient) { }

  private URLBase = environment.apiURL + '/WeatherForecast';

  public getWeatherForecast() : Observable<any> {
    return this.httpClient.get<any>(this.URLBase);
  }
}
