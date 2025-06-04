import { Component, inject } from '@angular/core';
import { ContainerComponent } from "../container/container.component";
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-footer',
  imports: [ContainerComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  theme = inject(ThemeService).theme;
}
