import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContainerComponent } from "../container/container.component";
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  private _themeService = inject(ThemeService);
  theme = this._themeService.theme;
}
