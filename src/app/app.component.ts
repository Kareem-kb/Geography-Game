import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Country, historyLog } from './data/data';
import { DashboardComponent } from './dash-borad/dashboard.component';
import { CountryService } from './services/country.service';
import { CommonModule } from '@angular/common';
import { HistoryLogComponent } from './history-log/history-log.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, DashboardComponent, HistoryLogComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    @if (selectedCountry) {
      <app-dashboard
        [selectedCountry]="selectedCountry"
        [randomCountry]="randomCountry"
        (newGame)="startNewGame()"
        (resultLogged)="onResultLogged($event)" />
    }
    @if (historyLog.length > 0) {
      <app-history-log [historyLog]="historyLog" />
    }
    <label>
      Enter Country:
      <input type="text" [(ngModel)]="countryName" />
    </label>
    <button (click)="fetchData()">Fetch</button>
    <h1 *ngIf="selectedCountry">{{ selectedCountry.fullName }}</h1>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'geography-game';
  countryName = '';
  selectedCountry?: Country;
  randomCountry!: Country;
  historyLog: historyLog[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getRandomCountry();
  }

  getRandomCountry(): void {
    this.randomCountry = this.countryService.randomCountry();
  }
  onResultLogged(result: historyLog) {
    this.historyLog = [...this.historyLog, result];
  }
  startNewGame() {
    this.selectedCountry = undefined;
    this.countryName = ''; // ✅ Clear input field
    this.historyLog = []; // Clear history
    this.getRandomCountry();
  }

  fetchData(): void {
    const country = this.countryService.getCountryByName(this.countryName);
    this.selectedCountry = country;
  }
}
