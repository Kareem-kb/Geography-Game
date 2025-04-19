import { Injectable } from '@angular/core';
import { countries, Country } from '../data/data';

@Injectable({
  providedIn: 'root',
})
export class DataFetching {
  getCountries(countryName: string): Country[] {
    return countries.filter(
      country =>
        country.name.toLowerCase().trim() === countryName.toLowerCase().trim()
    );
  }
}
