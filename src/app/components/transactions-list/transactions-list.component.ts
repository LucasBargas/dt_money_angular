import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ITransactions } from '../../interfaces/ITransactions';
import { BrlCurrencyPipe } from '../../pipes/brl-currency.pipe';
import { ModalModeService } from '../../services/modalMode.service';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionsResumeService } from '../../services/transactionsResume.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule, BrlCurrencyPipe, FontAwesomeModule],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent {
  transactions = input<ITransactions[]>();
  private _mode = inject(ModalModeService);
  faPen = faPen;
  faTrash = faTrash;
  theme = inject(ThemeService).theme;

  constructor(
    private transactionsService: TransactionsService,
    private transactionsResume: TransactionsResumeService
  ) { }

  onEditButton(transaction: ITransactions) {
    this._mode.setSelectedTransaction(transaction);
    this._mode.setModalMode('edit')
    this._mode.setModalAppears(true);
  }

  onDeleteButton(transaction: ITransactions) {
    this.transactionsService.deleteTransaction(transaction).subscribe({
      next: () => {
        this.transactionsResume.fetchTransactions();
      },
      error: (err) => {
        console.error('Erro ao deletar a transação:', err);
      }
    });
  }

}
