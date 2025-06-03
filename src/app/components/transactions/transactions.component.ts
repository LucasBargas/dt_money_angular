import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ITransactions } from '../../interfaces/ITransactions';
import { BrlCurrencyPipe } from '../../pipes/brl-currency.pipe';
import { ModalModeService } from '../../services/modalMode.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';
import { TransactionsDeleteModalComponent } from "./transactions-delete-modal/transactions-delete-modal.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, BrlCurrencyPipe, FontAwesomeModule, TransactionsDeleteModalComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  transactions = input<ITransactions[]>();
  private _mode = inject(ModalModeService);
  faPen = faPen;
  faTrash = faTrash;
  theme = inject(ThemeService).theme;
  transactionRef!: ITransactions;
  deleteModalIsActive = false;

  onEditButton(transaction: ITransactions) {
    this._mode.setSelectedTransaction(transaction);
    this._mode.setModalMode('edit')
    this._mode.setModalAppears(true);
  }

  seTransactionRef(transaction: ITransactions) {
    this.transactionRef = transaction;
    this.deleteModalIsActive = true;
  }
}
