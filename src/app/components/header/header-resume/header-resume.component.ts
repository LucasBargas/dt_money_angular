import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { TransactionsResumeService } from '../../../services/transactionsResume.service';
import { TransactionsService } from '../../../services/transactions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-resume.component.html',
  styleUrl: './header-resume.component.scss'
})
export class HeaderResumeComponent implements OnInit {
  private themeService = inject(ThemeService);
  theme = this.themeService.getTheme();
  private transactionsResumeService = inject(TransactionsResumeService);
  transactionsResume = this.transactionsResumeService.getTransactions();
  totalSales = 0;
  totalExpenses = 0;
  private subscription?: Subscription;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.subscription = this.transactionsService.getTransactions().subscribe((transactions) => {
      this.transactionsResumeService.setTransactions(transactions);

      this.totalSales = this.calculate('Venda');
      this.totalExpenses = this.calculate('Gasto');
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  calculate(type: string): number {
    const resume = this.transactionsResume()
      .filter(t => t.transactionType === type)
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    return resume;
  }
}
