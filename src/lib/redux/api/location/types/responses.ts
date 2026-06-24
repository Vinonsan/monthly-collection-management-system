export interface Location {
  id: string;
  wardNumber: string | number;
  address: string;
  collector: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface LocationListResponse {
  data: Location[];
  meta: PaginationMeta;
}

export interface LocationResponse {
  data: Location;
}

export interface DeleteLocationResponse {
  success: boolean;
  id: string;
}
