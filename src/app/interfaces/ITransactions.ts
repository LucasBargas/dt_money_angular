export interface ITransactions {
  id?: string;
  description: string;
  category: string;
  amount: number;
  type: 'Venda' | 'Gasto';
  created_at?: string;
}
