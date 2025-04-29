import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Country, historyLog, countries } from './data/data';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountryService } from './services/country.service';
import { CommonModule } from '@angular/common';
import { HistoryLogComponent } from './history-log/history-log.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DashboardComponent,
    HistoryLogComponent,
    AutocompleteComponent,
    GoogleMapsModule,
  ],
  template: `
    <div class="max-h-screen ">
      <div class="max-w-4xl mx-auto">
        <header class="text-center mb-8">
          <h1 class="text-4xl font-bold text-blue-800 mb-2">Welcome !</h1>
          <p class="text-gray-600">
            Test your geography knowledge by guessing countries!
          </p>
        </header>
        <div>
          <app-dashboard
            [selectedCountry]="selectedCountry"
            [randomCountry]="randomCountry"
            (newGame)="startNewGame()"
            (resultLogged)="onResultLogged($event)" />
          <div class="flex flex-row-reverse gap-4">
            <div class="w-2/3">
              @if (apiLoaded) {
                <div class="h-[400px] w-full mb-5">
                  <google-map
                    [center]="center"
                    [zoom]="zoom"
                    [options]="mapOptions"
                    width="100%"
                    height="100%">
                  </google-map>
                </div>
              } @else {
                <div class="bg-white rounded-xl shadow-lg p-6 mb-8 text-center">
                  <p>Loading map...</p>
                </div>
              }
            </div>
            <div class="w-1/3">
              <app-autocomplete
                [countries]="countries"
                (countrySelected)="onCountrySelected($event)" />
              <app-history-log [historyLog]="historyLog" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  selectedCountry?: Country;
  randomCountry!: Country;
  historyLog: historyLog[] = [];
  countries = countries;
  center: google.maps.LatLngLiteral = {
    lat: 20.5937,
    lng: 78.9629,
  };
  zoom = 0;
  mapOptions: google.maps.MapOptions = {
    mapId: environment.googleMaps.mapId,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 5,
    minZoom: 1,
  };
  apiLoaded = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getRandomCountry();
    this.loadGoogleMapsApi();
  }

  private loadGoogleMapsApi(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMaps.apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.apiLoaded = true;
    };
    script.onerror = () => {
      console.error('Error loading Google Maps API');
    };
    document.head.appendChild(script);
  }

  onCountrySelected(country: Country): void {
    this.selectedCountry = country;
  }

  getRandomCountry(): void {
    this.randomCountry = this.countryService.randomCountry();
  }

  onResultLogged(result: historyLog): void {
    this.historyLog = [...this.historyLog, result];
  }

  startNewGame(): void {
    this.selectedCountry = undefined;
    this.historyLog = [];
    this.getRandomCountry();
  }
}
