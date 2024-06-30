export interface ITable {
  columns: ITableHeader[];
  data: ITableData[];
  loader: boolean;
  handleEdit: any;
  handleDisable: any;
  handleDelete: any;
  action: string;
  disabledRows: string[];
  mode: string;
}

export interface ICard {
  label: string;
  value: number;
}

export interface ITableData {
  category: string;
  name: string;
  price: string;
  quantity: number;
  value: string;
}

export interface ICardData {
  totalProduct: number;
  totalStoreValue: number;
  outOfStock: number;
  numberOfCategory: number;
}

export interface ITableHeader {
  header: string;
  accessor: string;
}
