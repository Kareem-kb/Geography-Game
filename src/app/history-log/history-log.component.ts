import { historyLog } from '../data/data';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// history-log.component.ts
@Component({
  selector: 'app-history-log',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-8 p-4 border rounded-lg">
      <h2 class="text-xl font-bold mb-4">Game History</h2>
      <div *ngFor="let entry of historyLog" class="mb-4 p-2 border-b">
        <div class="flex justify-between">
          <span>Your guess: {{ entry.selected.name }}</span>
          <span
            class="font-bold"
            [ngClass]="entry.isCorrect ? 'text-green-600' : 'text-red-600'">
            {{ entry.isCorrect ? '✓' : '✗' }}
          </span>
        </div>
        <div class="text-sm text-gray-600">
          Target: {{ entry.random.name }} • Direction: {{ entry.direction }}
        </div>
      </div>
    </div>
  `,
})
export class HistoryLogComponent {
  @Input() historyLog: historyLog[] = [];
}
