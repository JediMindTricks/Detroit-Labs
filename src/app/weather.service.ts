import { Injectable } from '@angular/core';
import { CurrentWeather } from './current-weather';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  current:CurrentWeather = new CurrentWeather('New York', '80', '#', 'sunny', '96', '72')
  constructor(private http:HttpClient) { }

  weatherNow(){
    return this.current;
  }

  localWeather(lat:string, lon:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=381779068d47eab47875181d6b9702e1&units=imperial`);
  }

  newCityWeather(city:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=381779068d47eab47875181d6b9702e1&units=imperial`);
  }
}
