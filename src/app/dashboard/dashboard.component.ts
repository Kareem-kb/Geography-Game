import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country, historyLog } from '../data/data';
import { WinDialogComponent } from '../win-dialog/win-dialog.component';

/**
 * Component that displays the game dashboard with country comparison
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, WinDialogComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnChanges {
  /** The country selected by the user */
  @Input({ required: true }) selectedCountry!: Country;

  /** The random country to guess */
  @Input({ required: true }) randomCountry!: Country;

  /** Event emitted when a new game is requested */
  @Output() newGame = new EventEmitter<void>();

  /** Event emitted when a result is logged */
  @Output() resultLogged = new EventEmitter<historyLog>();

  /** Properties to display for country comparison */
  countryProps: { key: keyof Country; arrow: boolean }[] = [
    { key: 'name', arrow: false },
    { key: 'equator', arrow: false },
    { key: 'continent', arrow: false },
    { key: 'avgTemperature', arrow: true },
    { key: 'population', arrow: true },
  ];

  /** Whether to show the win modal */
  showModal = false;

  /**
   * Handles input changes and emits results
   */
  ngOnChanges() {
    if (!this.selectedCountry || !this.randomCountry) {
      return;
    }

    const result: historyLog = {
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

  /**
   * Handles the play again action
   */
  onPlayAgain(): void {
    this.showModal = false;
    this.newGame.emit();
  }

  /**
   * Gets the CSS class for a property based on comparison
   */
  getClass(key: keyof Country): string {
    return this.selectedCountry[key] === this.randomCountry[key]
      ? 'bg-green-400'
      : 'bg-red-100 border-red-500';
  }

  /**
   * Gets the arrow direction for numeric comparisons
   */
  getArrow(key: keyof Country): string {
    const selectedValue = this.selectedCountry[key] as number;
    const randomValue = this.randomCountry[key] as number;
    const diff = selectedValue - randomValue;
    return diff > 0 ? '↓' : diff < 0 ? '↑' : '';
  }

  /**
   * Calculates the direction from selected country to random country
   */
  getDirection(): string {
    const latDiff = this.randomCountry.latitude - this.selectedCountry.latitude;
    const lonDiff =
      this.randomCountry.longitude - this.selectedCountry.longitude;
    const directions: string[] = [];

    if (latDiff > 3) directions.push('north');
    if (latDiff < -3) directions.push('south');
    if (lonDiff > 3) directions.push('east');
    if (lonDiff < -3) directions.push('west');

    return directions.join(' ') || 'same location';
  }
}
