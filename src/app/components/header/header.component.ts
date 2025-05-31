import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ContainerComponent } from "../container/container.component";
import { RouterLink } from '@angular/router';
import { HeaderResumeComponent } from "./header-resume/header-resume.component";
import { ModalModeService } from '../../services/modaMode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ContainerComponent, HeaderResumeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _themeService = inject(ThemeService);
  theme = this._themeService.theme;

  mode = inject(ModalModeService);

  onClick() {
    this.mode.setModalMode('add')
    this.mode.setModalAppears(true);
  }
}
