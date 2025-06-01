import { computed, Injectable, signal } from '@angular/core';
import { ITransactions } from '../interfaces/ITransactions';
import { TransactionsService } from './transactions.service';

@Injectable({ providedIn: 'root' })
export class TransactionsResumeService {
  private _transactions = signal<ITransactions[]>([]);

  constructor(private transactionsService: TransactionsService) {
    this.fetchTransactions(); // Initial loading
  }

  fetchTransactions() {
    this.transactionsService.getTransactions().subscribe((data) => {
      this._transactions.set(data);
    });
  }

  totalSales = computed(() =>
    this._transactions().filter(t => t.type === 'Venda')
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  );

  totalExpenses = computed(() =>
    this._transactions().filter(t => t.type === 'Gasto')
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  );

  getTransactions() {
    return this._transactions;
  }
}
