import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ContainerComponent } from "../container/container.component";
import { RouterLink } from '@angular/router';
import { HeaderResumeComponent } from "./header-resume/header-resume.component";
import { ModalModeService } from '../../services/modal-mode.service';

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

  private _mode = inject(ModalModeService);

  onClick() {
    this._mode.setModalMode('add')
    this._mode.setModalAppears(true);
  }
}
