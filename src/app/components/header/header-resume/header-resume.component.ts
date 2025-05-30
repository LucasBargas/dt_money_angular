import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-resume.component.html',
  styleUrl: './header-resume.component.scss'
})
export class HeaderResumeComponent {
  private themeService = inject(ThemeService);
  theme = this.themeService.getTheme();
}
