import { Injectable, signal } from '@angular/core';
import { ITransactions } from '../interfaces/ITransactions';

@Injectable({
  providedIn: 'root'
})
export class ModalModeService {
  private readonly _modalAppears = signal<boolean>(false);
  readonly modalAppears = this._modalAppears;
  private readonly _modalMode = signal<'edit' | 'add'>('add')
  readonly modalMode = this._modalMode;
  private readonly _selectedTransaction = signal<ITransactions | null>(null);
  readonly selectedTransaction = this._selectedTransaction;

  setModalMode(mode: 'edit' | 'add'): void {
    this._modalMode.set(mode);
  }

  setModalAppears(appears: boolean): void {
    this._modalAppears.set(appears);
  }

  setSelectedTransaction(transaction: ITransactions | null): void {
    this._selectedTransaction.set(transaction);
  }
}
