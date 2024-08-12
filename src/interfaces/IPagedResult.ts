export interface IPagedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}