import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-borad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>dash-borad works!</p>
    <section>
      <ul class="space-y-4">
        <li class="border-2 border-red-500 bg-red-100 p-4 rounded-lg">
          <div>sfdgbfdgn</div>
        </li>
        <li class="border-2 border-gray-300 p-4 rounded-lg">
          <div>Item 2</div>
        </li>
        <li class="border-2 border-gray-300 p-4 rounded-lg">
          <div>Item 3</div>
        </li>
        <li class="border-2 border-gray-300 p-4 rounded-lg">
          <div>Item 4</div>
        </li>
      </ul>
    </section>
  `,
  styles: [],
})
export class DashBoradComponent {}
