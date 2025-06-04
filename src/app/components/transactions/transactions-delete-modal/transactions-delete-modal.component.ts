import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ITransactions } from '../../../interfaces/ITransactions';
import { TransactionsService } from '../../../services/transactions.service';
import { TransactionsResumeService } from '../../../services/transactions-resume.service';
import { ThemeService } from '../../../services/theme.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-transactions-delete-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './transactions-delete-modal.component.html',
  styleUrl: './transactions-delete-modal.component.scss'
})
export class TransactionsDeleteModalComponent {
  transactionRef = input<ITransactions>();
  deleteModalIsActive = input<boolean>()
  deleteModalIsActiveChange = output<boolean>()
  theme = inject(ThemeService).theme;
  faXmark = faXmark;

  constructor(
    private transactionsService: TransactionsService,
    private transactionsResume: TransactionsResumeService
  ) { }

  onClick() {
    this.transactionsService.deleteTransaction(this.transactionRef()!).subscribe({
      next: () => {
        this.deleteModalIsActiveChange.emit(false)
        this.transactionsResume.fetchTransactions();
      },
      error: (err) => {
        console.error('Erro ao deletar a transação:', err);
      }
    });
  }

  outsideClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this.deleteModalIsActiveChange.emit(false)
    }
  }
}
