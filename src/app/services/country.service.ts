import { Injectable } from '@angular/core';
import { countries, Country } from '../data/data';

/**
 * Service responsible for managing country-related operations
 */
@Injectable({ providedIn: 'root' })
export class CountryService {
  /**
   * Returns a random country from the countries list
   * @returns A random Country object
   */
  randomCountry(): Country {
    if (!countries || countries.length === 0) {
      throw new Error('No countries available');
    }
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }

  /**
   * Finds a country by its name (case-insensitive)
   * @param countryName - The name of the country to find
   * @returns The Country object if found, undefined otherwise
   */
  getCountryByName(countryName: string): Country | undefined {
    if (!countryName || typeof countryName !== 'string') {
      throw new Error('Invalid country name provided');
    }

    const normalizedInput = countryName.toLowerCase().trim();
    return countries.find(
      country => country.name.toLowerCase().trim() === normalizedInput
    );
  }
}
