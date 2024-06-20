export type PaginationType = {
  skip: number;
  limit: number;
  sortBy?: Record<string, 'asc' | 'ascending' | 'desc' | 'descending'>;
};
