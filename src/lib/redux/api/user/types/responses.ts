export interface User {
  id: string;
  cardNumber: string;
  userName: string;
  phone: string;
  address: string;
  wardNumber?: string | number;
  locationId?: string;
  balance: number;
  monthlyCollectionAmount: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface UserListResponse {
  data: User[];
  meta: PaginationMeta;
}

export interface UserResponse {
  data: User;
}

export interface DeleteUserResponse {
  success: boolean;
  id: string;
}
