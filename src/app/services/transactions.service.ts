import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransactions } from '../interfaces/ITransactions';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private API_URL = `${environment.supabaseUrl}/rest/v1/transactions`;
  private API_KEY = environment.supabaseKey;
  private readonly headers = new HttpHeaders({
    'apikey': this.API_KEY,
    'Authorization': `Bearer ${this.API_KEY}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<ITransactions[]> {
    return this.http.get<ITransactions[]>(this.API_URL, { headers: this.headers });
  }
}
