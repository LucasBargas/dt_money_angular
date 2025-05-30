import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ContainerComponent } from "../container/container.component";
import { RouterLink } from '@angular/router';
import { HeaderResumeComponent } from "./header-resume/header-resume.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ContainerComponent, HeaderResumeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  theme = this.themeService.getTheme();
}
