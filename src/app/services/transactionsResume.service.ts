import { computed, Injectable, signal } from '@angular/core';
import { ITransactions } from '../interfaces/ITransactions';
import { TransactionsService } from './transactions.service';

@Injectable({ providedIn: 'root' })
export class TransactionsResumeService {
  private transactions = signal<ITransactions[]>([]);

  constructor(private transactionsService: TransactionsService) {
    this.fetchTransactions(); // Initial loading
  }

  fetchTransactions() {
    this.transactionsService.getTransactions().subscribe((data) => {
      this.transactions.set(data);
    });
  }

  totalSales = computed(() =>
    this.transactions().filter(t => t.transactionType === 'Venda')
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  );

  totalExpenses = computed(() =>
    this.transactions().filter(t => t.transactionType === 'Gasto')
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  );

  getTransactions() {
    return this.transactions;
  }
}
