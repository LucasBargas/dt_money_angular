import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<ITransactions[]> {
    return this.http.get<ITransactions[]>(this._API_URL, { headers: this._headers });
  }

  getTransactionById(id: string) {

  }

  postTransaction(transaction: ITransactions) {
    return this.http.post<ITransactions>(this._API_URL, transaction, { headers: this._headers });
  }
}
