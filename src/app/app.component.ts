import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { ToggleThemeButtonComponent } from "./components/toggle-theme-button/toggle-theme-button.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ToggleThemeButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  theme = inject(ThemeService).getTheme();
}
