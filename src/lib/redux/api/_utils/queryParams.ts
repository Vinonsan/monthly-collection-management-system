export type QueryParamPrimitive = string | number | boolean;
export type QueryParamValue =
  | QueryParamPrimitive
  | QueryParamPrimitive[]
  | null
  | undefined;

export interface QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  wardNumber?: string | number;
  status?: string;
  [key: string]: QueryParamValue;
}

const appendParam = (
  searchParams: URLSearchParams,
  key: string,
  value: QueryParamValue,
) => {
  if (value === undefined || value === null || value === "") {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => searchParams.append(key, String(item)));
    return;
  }

  searchParams.set(key, String(value));
};

export const buildQueryUrl = (
  params: QueryParams = {},
  baseUrl: string,
  filters: QueryParams = {},
) => {
  const searchParams = new URLSearchParams();
  const mergedParams: QueryParams = { ...params, ...filters };

  Object.entries(mergedParams).forEach(([key, value]) => {
    appendParam(searchParams, key, value);
  });

  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
