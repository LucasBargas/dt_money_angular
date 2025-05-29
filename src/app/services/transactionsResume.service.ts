import { Injectable, signal } from '@angular/core';
import { ITransactions } from '../interfaces/ITransactions';

@Injectable({ providedIn: 'root' })

export class TransactionsResumeService {
  private transactions = signal<ITransactions[]>([]);

  constructor() {}

  setTransactions(transactions: ITransactions[]) {
    this.transactions.set(transactions);
  }

  getTransactions() {
    return this.transactions;
  }
}
