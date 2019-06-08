import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';
import { NgForm } from '@angular/forms';
import 'rxjs';

@Component({
  selector: 'det-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  myWeather:CurrentWeather;
  location
  constructor(private ws:WeatherService) { }

  ngOnInit() {
    this.myWeather = this.ws.weatherNow();
    navigator.geolocation.getCurrentPosition((pos) => {
      this.location = pos.coords;
      const lat = this.location.latitude;
      const lon = this.location.longitude;
      this.ws.localWeather(lat, lon).subscribe(
        (data: any) => {
          console.log(data);
          this.myWeather = new CurrentWeather(data.name,
                                              data.main.temp,
                                              data.weather[0].icon,
                                              data.weather[0].description,
                                              data.main.temp_max,
                                              data.main.temp_min)
        }
      )
    })
  }

  onSubmit(weatherForm:NgForm) {
    this.ws.newCityWeather(weatherForm.value.city).subscribe(
      (data:any) => {
        console.log(data);
        this.myWeather = new CurrentWeather(data.name,
                                            data.main.temp,
                                            data.weather[0].icon,
                                            data.weather[0].description,
                                            data.main.temp_max,
                                            data.main.temp_min);
      }
    );
  }

}
