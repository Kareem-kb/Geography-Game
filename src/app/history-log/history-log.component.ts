import { historyLog } from '../data/data';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// history-log.component.ts
@Component({
  selector: 'app-history-log',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-4 p-2">
      <h2
        class="text-2xl font-extrabold mb-4 text-gray-800 tracking-wide border-b pb-2 ">
        Hints
      </h2>
      <div class="max-h-64 overflow-y-auto pr-2">
        @if (historyLog) {
          <div *ngFor="let entry of historyLog" class="mb-2">
            <div
              class="bg-gray-100 rounded-lg px-3 py-2 shadow-sm text-base font-medium text-gray-700">
              <span class="font-semibold text-gray-700">{{
                entry.direction
              }}</span>
              of <span class="font-semibold">{{ entry.selected.name }}</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class HistoryLogComponent {
  @Input() historyLog: historyLog[] = [];
}
