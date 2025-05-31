import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ThemeService {
  private _theme = signal<'light' | 'dark'>(this.loadTheme());
  readonly theme = this._theme;

  constructor() {
    // Update the body class always the theme changes
    effect(() => {
      const current = this._theme();
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(current);
    });
  }

  setTheme(value: 'light' | 'dark') {
    localStorage.setItem('theme', value);
    this._theme.set(value);
  }

  private loadTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light'; // light is default
  }
}
