import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Country } from '../../data/data';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <input
        type="text"
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchChange($event)"
        (focus)="showSuggestions = true"
        (blur)="onBlur()"
        (keydown.enter)="onEnter()"
        class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter country name..." />

      <!-- Suggestions Dropdown -->
      <div
        *ngIf="showSuggestions && filteredCountries.length > 0"
        class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
        <div
          *ngFor="let country of filteredCountries"
          (click)="selectCountry(country)"
          (keydown.enter)="selectCountry(country)"
          tabindex="0"
          class="p-2 hover:bg-gray-100 cursor-pointer">
          {{ country.name }}
        </div>
      </div>

      <!-- Error Message -->
      <div *ngIf="showError" class="text-red-500 text-sm mt-1">
        No country found with this name
      </div>
    </div>
  `,
  styles: [
    `
      .max-h-60 {
        max-height: 15rem;
      }
    `,
  ],
})
export class AutocompleteComponent {
  @Input() countries: Country[] = [];
  @Output() countrySelected = new EventEmitter<Country>();

  searchTerm = '';
  filteredCountries: Country[] = [];
  showSuggestions = false;
  showError = false;

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.showError = false;

    if (value.length >= 2) {
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );
      this.showSuggestions = true;
    } else {
      this.filteredCountries = [];
      this.showSuggestions = false;
    }
  }
  onEnter(): void {
    // Try to find an exact match
    const match = this.countries.find(
      c => c.name.toLowerCase() === this.searchTerm.trim().toLowerCase()
    );
    if (match) {
      this.selectCountry(match);
    } else {
      this.showError = true;
      this.showSuggestions = false;
    }
  }
  selectCountry(country: Country): void {
    this.searchTerm = country.name;
    this.countrySelected.emit(country);
    this.showSuggestions = false;
    this.showError = false;
  }

  onBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
      if (
        this.searchTerm &&
        !this.countries.some(
          c => c.name.toLowerCase() === this.searchTerm.toLowerCase()
        )
      ) {
        this.showError = true;
      }
    }, 200);
  }
}
