import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Country } from './data/data';
import { DashBoardComponent } from './dash-borad/dash-board.component';
import { RandomSelectService } from './services/random-select.service';
import { DataFetching } from './services/fetching.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, DashBoardComponent],
  template: ` <h1>Welcome to {{ title }}!</h1>
    <app-dash-borad />
    <label>
      Enter Country:
      <input type="text" [(ngModel)]="countryName" />
    </label>
    <button (click)="fetchData()">fetch</button>
    <h1 *ngIf="CountryInfo.length > 0">{{ this.CountryInfo[0].fullName }}</h1>`,
  styles: [],
})
export class AppComponent {
  title = 'geography-game';
  countryName = '';
  CountryInfo: Country[] = [];
  randomCountry = '';

  constructor(
    private dataFetching: DataFetching,
    private randomSelect: RandomSelectService
  ) {}
  fetchData(): void {
    const data = this.dataFetching.getCountries(this.countryName);
    this.CountryInfo = data;
    console.log(data);
  }
}
