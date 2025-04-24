import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Country, historyLog } from './data/data';
import { DashboardComponent } from './dash-borad/dashboard.component';
import { CountryService } from './services/country.service';
import { CommonModule } from '@angular/common';
import { HistoryLogComponent } from './history-log/history-log.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { countries } from './data/data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DashboardComponent,
    HistoryLogComponent,
    AutocompleteComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div class="max-w-4xl mx-auto">
        <header class="text-center mb-8">
          <h1 class="text-4xl font-bold text-blue-800 mb-2">
            Welcome to {{ title }}!
          </h1>
          <p class="text-gray-600">
            Test your geography knowledge by guessing countries!
          </p>
        </header>

        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div class="mb-6">
            <app-autocomplete
              [countries]="countries"
              (countrySelected)="onCountrySelected($event)"></app-autocomplete>
          </div>

          @if (selectedCountry) {
            <app-dashboard
              [selectedCountry]="selectedCountry"
              [randomCountry]="randomCountry"
              (newGame)="startNewGame()"
              (resultLogged)="onResultLogged($event)"
              class="animate-fade-in" />
          }

          @if (historyLog.length > 0) {
            <app-history-log
              [historyLog]="historyLog"
              class="mt-8 animate-slide-up" />
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
      }

      .animate-slide-up {
        animation: slideUp 0.5s ease-out;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'geography-game';
  selectedCountry?: Country;
  randomCountry!: Country;
  historyLog: historyLog[] = [];
  countries = countries;

  constructor(
    private countryService: CountryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getRandomCountry();
  }

  onCountrySelected(country: Country): void {
    this.selectedCountry = country;
    this.cdr.detectChanges();
  }

  getRandomCountry(): void {
    this.randomCountry = this.countryService.randomCountry();
    this.cdr.detectChanges();
  }

  onResultLogged(result: historyLog): void {
    this.historyLog = [...this.historyLog, result];
    this.cdr.detectChanges();
  }

  startNewGame(): void {
    this.selectedCountry = undefined;
    this.historyLog = [];
    this.getRandomCountry();
    this.cdr.detectChanges();
  }
}
