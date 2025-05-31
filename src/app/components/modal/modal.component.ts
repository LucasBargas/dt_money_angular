import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModalModeService } from '../../services/modaMode.service';
import { ThemeService } from '../../services/theme.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  private _themeService = inject(ThemeService);
  theme = this._themeService.theme;

  _mode = inject(ModalModeService);
  modalMode = this._mode.modalMode;
  modalAppears = this._mode.modalAppears;

  faXmark = faXmark;
  type = 'Entrada';

  outslideClick(e: MouseEvent) {
    if(e.target === e.currentTarget)
      this._mode.setModalAppears(false);
  }
}
