import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { ToggleThemeButtonComponent } from "./components/toggle-theme-button/toggle-theme-button.component";
import { HeaderComponent } from "./components/header/header.component";
import { ModalComponent } from "./components/modal/modal.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { TransactionsService } from './services/transactions.service';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, ToggleThemeButtonComponent, ModalComponent, LoadingComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  theme = inject(ThemeService).theme;
  isLoading = true;

  constructor(
    private transactionsResume: TransactionsService,
  ) { }

  ngOnInit(): void {
    this.transactionsResume.isLoading$.subscribe(loading => this.isLoading = loading);
    this.transactionsResume.getTransactions().subscribe();
  }
}
