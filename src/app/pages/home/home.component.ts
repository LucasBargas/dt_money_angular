import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from "../../components/transactions/transactions.component";
import { ContainerComponent } from "../../components/container/container.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { TransactionsResumeService } from '../../services/transactionsResume.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TransactionsComponent, ContainerComponent, FontAwesomeModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  theme = inject(ThemeService).theme;
  clearInput: boolean = false;
  private _transactionsResume = inject(TransactionsResumeService);
  filteredTransactions = this._transactionsResume.filteredTransactions;
  search = this._transactionsResume.search;

  constructor() {
    effect(() => {
      this.clearInput = this.search().trim().length > 3;
    });
  }
}
