export interface ITransactions {
  id: number;
  description: string;
  category: string;
  amount: string | number;
  transactionType: 'Venda' | 'Gasto';
  createdAt: string;
}
