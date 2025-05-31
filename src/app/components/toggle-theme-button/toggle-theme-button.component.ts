import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toggle-theme-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './toggle-theme-button.component.html',
  styleUrl: './toggle-theme-button.component.scss'
})
export class ToggleThemeButtonComponent {
  private _themeService = inject(ThemeService);
  theme = this._themeService.theme;
  faMoon = faMoon;
  faSun = faSun;

  toggleTheme(): void {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this._themeService.setTheme(next)
  }
}
