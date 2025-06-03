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
  const query = this.search().toLowerCase().trim();
  const items = this._transactions();

  // Se a string de busca for menor que 3 caracteres, retorna todos os itens sem aplicar filtro
  if (query.length < 3) return items;

  return items.filter((transaction) =>
    transaction.description?.toLowerCase().includes(query) ||
    transaction.type?.toLowerCase().includes(query) ||
    transaction.category?.toLowerCase().includes(query) ||
    transaction.amount.toString().includes(query)
  );
});
}
