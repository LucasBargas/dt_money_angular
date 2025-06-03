import { computed, Injectable, signal } from '@angular/core';
import { ITransactions } from '../interfaces/ITransactions';
import { TransactionsService } from './transactions.service';

@Injectable({ providedIn: 'root' })
export class TransactionsResumeService {
  private _transactions = signal<ITransactions[]>([]);
  readonly transactions = this._transactions;
  readonly search = signal('');

  constructor(private transactionsService: TransactionsService) {
    this.fetchTransactions(); // Initial loading
  }

  fetchTransactions() {
    this.transactionsService.getTransactions().subscribe((data) => {
      this._transactions.set(data);
    });
  }

  totalSales = computed(() =>
    this.transactions().filter(t => t.type === 'Venda')
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  );

  totalExpenses = computed(() =>
    this.transactions().filter(t => t.type === 'Gasto')
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  );

  filteredTransactions = computed(() => {
    const normalize = (text: string) =>
      text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const query = normalize(this.search().trim());
    const items = this._transactions();

    if (query.length < 3) return items;

    return items.filter((transaction) =>
      normalize(transaction.description || "").includes(query) ||
      normalize(transaction.type || "").includes(query) ||
      normalize(transaction.category || "").includes(query) ||
      transaction.amount.toString().includes(query)
    );
  });
}
