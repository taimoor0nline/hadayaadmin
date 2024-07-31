export interface PagedResult<T> {
    totalItems: number;
    queryResult?: string;
    items: T[];
  }
  