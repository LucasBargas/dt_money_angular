import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ITransactions } from '../../interfaces/ITransactions';
import { BrlCurrencyPipe } from '../../pipes/brl-currency.pipe';
import { ModalModeService } from '../../services/modal-mode.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';
import { TransactionsDeleteModalComponent } from "./transactions-delete-modal/transactions-delete-modal.component";
import { TransactionsResumeService } from '../../services/transactions-resume.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, BrlCurrencyPipe, FontAwesomeModule, TransactionsDeleteModalComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  private _transactionsResume = inject(TransactionsResumeService);
  filteredTransactions = this._transactionsResume.filteredTransactions;
  search = this._transactionsResume.search;
  private _mode = inject(ModalModeService);
  faPen = faPen;
  faTrash = faTrash;
  theme = inject(ThemeService).theme;
  transactionRef!: ITransactions;
  deleteModalIsActive = false;

  visibleCount = 8;

  onEditButton(transaction: ITransactions) {
    this._mode.setSelectedTransaction(transaction);
    this._mode.setModalMode('edit');
    this._mode.setModalAppears(true);
  }

  seTransactionRef(transaction: ITransactions) {
    this.transactionRef = transaction;
    this.deleteModalIsActive = true;
  }

  onClick() {
    this._mode.setModalMode('add');
    this._mode.setModalAppears(true);
  }

  loadMore() {
    this.visibleCount += 8;
  }

  canLoadMore(): boolean {
    const total = this.filteredTransactions().length;
    return total > 8 && total > this.visibleCount;
  }
}
