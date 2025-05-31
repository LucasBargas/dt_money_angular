import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { TransactionsResumeService } from '../../../services/transactionsResume.service';
import { BrlCurrencyPipe } from '../../../pipes/brl-currency.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// slides-per-view="2"
// navigation="true"
/// space-between="16"

@Component({
  selector: 'app-header-resume',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, BrlCurrencyPipe, FontAwesomeModule],
  templateUrl: './header-resume.component.html',
  styleUrl: './header-resume.component.scss'
})
export class HeaderResumeComponent implements AfterViewInit {
  @ViewChild('swiperEl') swiperEl!: ElementRef;

  private themeService = inject(ThemeService);
  theme = this.themeService.getTheme();

  private transactionsResumeService = inject(TransactionsResumeService);
  totalSales = this.transactionsResumeService.totalSales;
  totalExpenses = this.transactionsResumeService.totalExpenses;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  private slidePerView = 2

  @HostListener('window:resize')
  onResize() {
    this.adjustSlidesPerView();
    this.updateSwiperAttributes();
  }

  ngAfterViewInit(): void {
    this.adjustSlidesPerView();
    this.updateSwiperAttributes();
  }

  private updateSwiperAttributes() {
    if (this.swiperEl) {
      const el = this.swiperEl.nativeElement;
      el.setAttribute('slides-per-view', this.slidePerView.toString());
      el.setAttribute('navigation', 'true');
      el.setAttribute('loop', 'true');
    }
  }

  private adjustSlidesPerView() {
    if (window.innerWidth <= 640) {
      this.slidePerView = 1;
    } else if (window.innerWidth <= 768) {
      this.slidePerView = 2;
    } else if (window.innerWidth <= 1536) {
      this.slidePerView = 3;
    } else {
      this.slidePerView = 3;
    }
  }
}
