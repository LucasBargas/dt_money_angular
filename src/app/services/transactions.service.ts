import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { ITransactions } from '../interfaces/ITransactions';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private _API_URL = `${environment.supabaseUrl}/rest/v1/transactions`;
  private _API_KEY = environment.supabaseKey;
  private readonly _headers = new HttpHeaders({
    'apikey': this._API_KEY,
    'Authorization': `Bearer ${this._API_KEY}`,
    'Content-Type': 'application/json',
  });
  public isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<ITransactions[]> {
    const url = `${this._API_URL}?order=created_at.desc`;

    return this.http.get<ITransactions[]>(url, { headers: this._headers }).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }

  postTransaction(transaction: ITransactions) {
    return this.http.post<ITransactions>(this._API_URL, transaction, { headers: this._headers });
  }

  updateTransaction(transaction: ITransactions) {
    const url = `${this._API_URL}?id=eq.${transaction.id}`;
    return this.http.put<ITransactions>(url, transaction, {
      headers: this._headers,
    });
  }

  deleteTransaction(transaction: ITransactions) {
    const url = `${this._API_URL}?id=eq.${transaction.id}`;
    return this.http.delete<ITransactions>(url, {
      headers: this._headers,
    });
  }
}
