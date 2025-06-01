export interface ITransactions {
  id: number;
  description: string;
  category: string;
  amount: string | number;
  type: 'Venda' | 'Gasto';
  createdAt: string;
}
