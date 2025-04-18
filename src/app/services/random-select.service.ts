import { Injectable } from '@angular/core';
import { countries, Country } from '../data/data';
@Injectable({
  providedIn: 'root',
})
export class RandomSelectService {
  getRendom(): Country[] {
    const randomIndex = Math.floor(Math.random() * countries.length);
    console.log(randomIndex);
    return [countries[randomIndex]];
  }
}
