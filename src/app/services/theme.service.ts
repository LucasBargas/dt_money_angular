import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ThemeService {
  private theme = signal<'light' | 'dark'>(this.loadTheme());

  constructor() {
    // Update the body class always the theme changes
    effect(() => {
      const current = this.theme();
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(current);
    });
  }

  setTheme(value: 'light' | 'dark') {
    localStorage.setItem('theme', value);
    this.theme.set(value);
  }

  getTheme() {
    return this.theme;
  }

  private loadTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light'; // light is default
  }
}
