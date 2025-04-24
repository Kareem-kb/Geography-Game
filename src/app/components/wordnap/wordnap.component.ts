import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wordnap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center items-center p-8">
      <div class="relative group">
        <img
          src="assets/WordNap.png"
          alt="WordNap"
          class="w-64 h-64 object-contain transition-transform duration-300 group-hover:scale-105" />
        <div
          class="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
      </div>
    </div>
  `,
  styles: [],
})
export class WordnapComponent {}
