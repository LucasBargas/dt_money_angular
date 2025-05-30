import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { TransactionsResumeService } from '../../../services/transactionsResume.service';
import { ITransactions } from '../../../interfaces/ITransactions';
import { BrlCurrencyPipe } from '../../../pipes/brl-currency.pipe';

@Component({
  selector: 'app-header-resume',
  standalone: true,
  imports: [CommonModule, BrlCurrencyPipe],
  templateUrl: './header-resume.component.html',
  styleUrl: './header-resume.component.scss'
})
export class HeaderResumeComponent {
  private themeService = inject(ThemeService);
  theme = this.themeService.getTheme();

  private transactionsResumeService = inject(TransactionsResumeService);
  totalSales = this.transactionsResumeService.totalSales;
  totalExpenses = this.transactionsResumeService.totalExpenses;
}
