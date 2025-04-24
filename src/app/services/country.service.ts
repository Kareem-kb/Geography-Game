import { Injectable } from '@angular/core';
import { countries, Country } from '../data/data';

@Injectable({ providedIn: 'root' })
export class CountryService {
  randomCountry(): Country {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }

  getCountryByName(countryName: string): Country | undefined {
    return countries.find(
      country =>
        country.name.toLowerCase().trim() === countryName.toLowerCase().trim()
    );
  }
}
