import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { TransactionsResumeService } from '../../../services/transactionsResume.service';
import { BrlCurrencyPipe } from '../../../pipes/brl-currency.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import type { Swiper } from 'swiper/types';

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
  private _themeService = inject(ThemeService);
  theme = this._themeService.theme;
  private _transactionsResumeService = inject(TransactionsResumeService);
  totalSales = this._transactionsResumeService.totalSales;
  totalExpenses = this._transactionsResumeService.totalExpenses;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  swiper!: Swiper;
  slidePerView = 2

  constructor() {
    register();
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustSlidesPerView();
    this.updateSwiperAttributes();
  }

  ngAfterViewInit(): void {
    this.adjustSlidesPerView();
    this.updateSwiperAttributes();
  }

  private updateSwiperAttributes(): void {
    if (this.swiperEl) {
      const el = this.swiperEl.nativeElement;
      this.swiper = el.swiper;
      el.setAttribute('slides-per-view', this.slidePerView.toString());
    }
  }

  private adjustSlidesPerView(): void {
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
