import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { TransactionsResumeService } from '../../../services/transactionsResume.service';
import { BrlCurrencyPipe } from '../../../pipes/brl-currency.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-resume',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, BrlCurrencyPipe, FontAwesomeModule],
  templateUrl: './header-resume.component.html',
  styleUrl: './header-resume.component.scss'
})
export class HeaderResumeComponent implements AfterViewInit {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLDivElement>;

  private _themeService = inject(ThemeService);
  theme = this._themeService.theme;

  private _transactionsResumeService = inject(TransactionsResumeService);
  totalSales = this._transactionsResumeService.totalSales;
  totalExpenses = this._transactionsResumeService.totalExpenses;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  position = 0;
  private _active = 0;
  calc = 2;
  totalSlides = 3;

  constructor(private cdr: ChangeDetectorRef) { }

  @HostListener('window:resize')
  onResize() {
    this._adjustSlidesPerView();
  }

  ngAfterViewInit(): void {
    this._adjustSlidesPerView();
    this.cdr.detectChanges();
  }

  private _updatePosition(): void {
    if (this.sliderRef) {
      const slideElement = this.sliderRef.nativeElement.querySelector('.header-resume-area-single');
      const slideWidth = slideElement?.getBoundingClientRect().width || 0;
      this.position = -(slideWidth * this._active);
      this.cdr.markForCheck();
    }
  }

  clickOnNext() {
    const maxIndex = this.totalSlides - this.calc;
    this._active = this._active < maxIndex ? this._active + 1 : 0;
    this._updatePosition();
  }

  clickOnPrev() {
    const maxIndex = this.totalSlides - this.calc;
    this._active = this._active > 0 ? this._active - 1 : maxIndex;
    this._updatePosition();
  }

private _adjustSlidesPerView(): void {
  if (window.innerWidth <= 640) {
    this.calc = 1;
  } else if (window.innerWidth <= 768) {
    this.calc = 2;
  } else {
    this.calc = 3;
  }

  const maxIndex = this.totalSlides - this.calc;
  if (this._active > maxIndex) {
    this._active = maxIndex >= 0 ? maxIndex : 0;
  }

  this._updatePosition();
}
}
