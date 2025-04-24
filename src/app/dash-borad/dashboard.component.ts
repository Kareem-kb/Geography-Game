import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../data/data';
import { WinDialogComponent } from '../win-dialog/win-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, WinDialogComponent],
  template: `
    <section>
      <ul class="space-y-4">
        <ng-container *ngFor="let prop of countryProps">
          <li class="border-2 p-4 rounded-lg" [ngClass]="getClass(prop.key)">
            <div>
              {{ selectedCountry[prop.key] }}
              <span *ngIf="prop.arrow">{{ getArrow(prop.key) }}</span>
            </div>
          </li>
        </ng-container>
        <li class="border-2 border-gray-300 p-4 rounded-lg">
          <div>direction: {{ getDirection() }}</div>
        </li>
      </ul>
      <h1>{{ randomCountry.name }}</h1>
      <app-win-dialog *ngIf="showModal" (playAgain)="onPlayAgain()" />
    </section>
  `,
})
export class DashboardComponent implements OnChanges {
  @Input({ required: true }) selectedCountry!: Country;
  @Input({ required: true }) randomCountry!: Country;
  @Output() newGame = new EventEmitter<void>();
  @Output() resultLogged = new EventEmitter<{
    selected: Country;
    random: Country;
    isCorrect: boolean;
    direction: string;
  }>();

  countryProps: { key: keyof Country; arrow: boolean }[] = [
    { key: 'name', arrow: false },
    { key: 'equator', arrow: false },
    { key: 'continent', arrow: false },
    { key: 'avgTemperature', arrow: true },
    { key: 'population', arrow: true },
  ];

  showModal = false;

  ngOnChanges() {
    if (this.selectedCountry && this.randomCountry) {
      const result = {
        selected: this.selectedCountry,
        random: this.randomCountry,
        isCorrect: this.selectedCountry.name === this.randomCountry.name,
        direction: this.getDirection(),
      };
      this.resultLogged.emit(result);

      if (result.isCorrect) {
        setTimeout(() => (this.showModal = true), 1000);
      }
    }
  }

  onPlayAgain() {
    this.showModal = false;
    this.newGame.emit();
  }

  // Keep only these 3 methods if needed
  getClass(key: keyof Country) {
    return this.selectedCountry[key] === this.randomCountry[key]
      ? 'bg-green-400'
      : 'bg-red-100 border-red-500';
  }

  getArrow(key: keyof Country) {
    const diff =
      (this.selectedCountry[key] as number) -
      (this.randomCountry[key] as number);
    return diff > 0 ? '↓' : diff < 0 ? '↑' : '';
  }

  getDirection() {
    const latDiff = this.randomCountry.latitude - this.selectedCountry.latitude;
    const lonDiff =
      this.randomCountry.longitude - this.selectedCountry.longitude;
    const directions = [];
    if (latDiff > 3) directions.push('north');
    if (latDiff < -3) directions.push('south');
    if (lonDiff > 3) directions.push('east');
    if (lonDiff < -3) directions.push('west');
    return directions.join(' ') || 'same location';
  }
}
