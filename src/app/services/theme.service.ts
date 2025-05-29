import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ThemeService {
  private theme = signal<'light' | 'dark'>('dark');

  constructor() {}

  setTheme(value: 'light' | 'dark') {
    this.theme.set(value);
  }

  getTheme() {
    return this.theme;
  }
}
