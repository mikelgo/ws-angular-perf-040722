import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dirty-check',
  template: ` <code class="dirty-checks">({{ checked }})</code> `,
  styles: [
    `
      :host {
        display: inline-block;
        border-radius: 100%;
        border: 2px solid var(--palette-secondary-main);
        padding: 1rem;
        font-size: var(--text-lg);
      }
    `,
  ],
  standalone: true,
})
export class DirtyCheckComponent implements OnInit {
  private _checked = 0;
  get checked(): number {
    return this._checked++;
  }

  constructor() {}

  ngOnInit(): void {}
}
