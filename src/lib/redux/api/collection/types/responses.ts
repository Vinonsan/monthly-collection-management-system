export interface Collection {
  id: string;
  cardNumber: string;
  userName: string;
  ward: string | number;
  monthlyCollectionAmount: number;
  balance: number;
  paidAmount: number;
  lastPaidMonth: string;
  status: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface CollectionListResponse {
  data: Collection[];
  meta: PaginationMeta;
}

export interface CollectionResponse {
  data: Collection;
}

export interface DeleteCollectionResponse {
  success: boolean;
  id: string;
}
