import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { ModalModeService } from '../../services/modalMode.service';
import { ThemeService } from '../../services/theme.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITransactions } from '../../interfaces/ITransactions';
import { TransactionsResumeService } from '../../services/transactionsResume.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  form!: FormGroup;
  private _themeService = inject(ThemeService);
  theme = this._themeService.theme;
  mode = inject(ModalModeService);
  modalMode = this.mode.modalMode;
  modalAppears = this.mode.modalAppears;
  faXmark = faXmark;
  type: string = 'Venda'
  transaction = input<ITransactions>();

  constructor(
    private formBuilder: FormBuilder,
    private transactionsResume: TransactionsResumeService,
    private transactions: TransactionsService
  ) { }

  ngOnInit(): void {
    if (this.modalMode() === 'add') {
      this.form = this.handleFormBuilder();
    } else {
      this.form = this.handleFormBuilder(this.transaction());
      this.setType(this.transaction()!.type);
    }
  }

  private defaultValidators(value: string | undefined = '') {
    return [
      value,
      Validators.compose([
        Validators.required,
        Validators.pattern(/^\s*\S.*$/),
      ])
    ];
  }

  handleFormBuilder(transaction?: ITransactions) {
    const isEditMode = this.modalMode() === 'edit';

    const formConfig: { [key: string]: any } = {
      description: this.defaultValidators(transaction?.description),
      category: this.defaultValidators(transaction?.category),
      amount: this.defaultValidators(transaction?.amount !== undefined ? String(transaction.amount) : undefined),
      type: [this.type],
    };

    if (isEditMode && transaction) {
      formConfig['id'] = [transaction.id!];
      formConfig['created_at'] = [transaction.created_at!];
    }

    return this.formBuilder.group(formConfig);
  }

  setType(value: 'Venda' | 'Gasto') {
    this.type = value;
    this.form.get('type')?.setValue(value);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Show all the errors when forms is submitted
      return;
    }

    if (this.modalMode() === 'add') {
      this.postTransaction();
    } else {
      console.log('Aqui vai ser para editar. Calma!')
    }
  }

  postTransaction() {
    this.transactions.postTransaction(this.form.value).subscribe({
      next: () => {
        this.transactionsResume.fetchTransactions();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao adicionar transação:', err);
      }
    });
  }

  hasError(field: string, error: string) {
    const control = this.form.get(field);
    return control?.hasError(error) && (control?.touched || control?.dirty);
  }

  outslideClick(e: MouseEvent) {
    if (e.target === e.currentTarget)
      this.closeModal();
  }

  closeModal() {
    this.mode.setModalAppears(false);
    this.form.reset();

    if (this.modalMode() === 'add') {
      this.setType('Venda')
    } else {
      this.setType(this.transaction()!.type)
    }
  }
}
