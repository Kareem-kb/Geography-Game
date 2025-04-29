import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-win-dialog',
  imports: [],
  template: `
    <div
      class=" bg-black bg-opacity-50 fixed inset-0 z-[9999] flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg text-center max-w-md">
        <h2 class="text-2xl mb-4 font-bold text-green-600">Correct! 🎉</h2>
        <p class="mb-4">You guessed the country correctly!</p>
        <button
          (click)="playAgain.emit()"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Play Again
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class WinDialogComponent {
  @Output() playAgain = new EventEmitter<void>();
}
